import passport from 'passport';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { sign } from 'jsonwebtoken';
import express, { Express, Request, Response, NextFunction } from 'express';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import MagicLoginStrategy from 'passport-magic-login';
import type { Profile } from 'passport';
import { prisma } from '../../src/server/prisma';
import { assignAnswerToUser } from '../../src/server/answers';
import ms from 'ms';
import { respond404 } from '../../src/server/errors';
import { sendEmail } from '../../src/server/mailing';

const app: Express = express();

const PUBLIC_URL = process.env.PUBLIC_URL
  ? process.env.PUBLIC_URL
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : null;
const OAUTH_CALLBACK_URL = process.env.OAUTH_CALLBACK_URL || PUBLIC_URL;

if (!PUBLIC_URL) {
  throw new Error('PUBLIC_URL is not defined');
}

const providers = {
  facebook: {
    strategy: () => {
      return new FacebookStrategy(
        {
          clientID: process.env['OAUTH_FACEBOOK_CLIENT_ID'] as string,
          clientSecret: process.env['OAUTH_FACEBOOK_CLIENT_SECRET'] as string,
          profileFields: ['id', 'displayName', 'email'],
          callbackURL: `${OAUTH_CALLBACK_URL}/api/auth/facebook/callback`,
        },
        getStrategyCallback('facebook')
      );
    },
    enabled: !!(
      process.env['OAUTH_FACEBOOK_CLIENT_ID'] &&
      process.env['OAUTH_FACEBOOK_CLIENT_SECRET']
    ),
    scope: ['email', 'public_profile'],
  },
  google: {
    strategy: () => {
      return new GoogleStrategy(
        {
          clientID: process.env['OAUTH_GOOGLE_CLIENT_ID'] as string,
          clientSecret: process.env['OAUTH_GOOGLE_CLIENT_SECRET'] as string,
          callbackURL: `${OAUTH_CALLBACK_URL}/api/auth/google/callback`,
          scope: ['profile', 'email'],
        },
        getStrategyCallback('google')
      );
    },
    enabled: !!(
      process.env['OAUTH_GOOGLE_CLIENT_ID'] &&
      process.env['OAUTH_GOOGLE_CLIENT_SECRET']
    ),
    scope: ['profile', 'email'],
  },
};

const getStrategyCallback = (strategy: string) => {
  return async (
    accessToken: string | null,
    refreshToken: string | null,
    profile: Profile | { destination: string },
    cb: (error: any, user?: any, info?: any) => void
  ) => {
    let email: string | undefined;
    if (strategy === 'magiclogin') {
      email = (profile as { destination: string }).destination;
      profile = {
        displayName: email,
        id: email,
        authProvider: 'magiclogin',
        provider: 'magiclogin',
      } as Profile;
    } else {
      profile = profile as Profile;
      email = profile.emails && profile.emails[0] && profile.emails[0].value;
    }
    if (!email) {
      // This is for facebook user, which doesn't have email
      try {
        const user = await prisma.user.upsert({
          where: {
            authProviderId: profile.id,
          },
          update: {
            authProvider: strategy,
            authProviderId: profile.id,
            displayName: profile.displayName,
          },
          create: {
            email: null,
            displayName: profile.displayName,
            authProvider: strategy,
            authProviderId: profile.id,
          },
        });
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
    try {
      const user = await prisma.user.upsert({
        where: {
          email: email,
        },
        update: {
          authProvider: strategy,
          authProviderId: profile.id,
        },
        create: {
          email: email,
          displayName: profile.displayName,
          authProvider: strategy,
          authProviderId: profile.id,
        },
      });
      return cb(null, user);
    } catch (err) {
      try {
        // Existing user currently stored without email now returning with email
        // Edge case - handled here
        const user = await prisma.user.update({
          where: {
            authProviderId: profile.id,
          },
          data: {
            email: email,
            displayName: profile.displayName,
            authProvider: strategy,
            authProviderId: profile.id,
          },
        });
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  };
};

const redirectAfterCallback = (returnTo: string, res: Response) => {
  if (typeof returnTo === 'string' && returnTo.startsWith('/')) {
    return res.redirect(returnTo);
  }
  return res.redirect('/');
};

const getMagicLogin = () => {
  if (!process.env.MAGIC_LINK_SECRET) {
    throw new Error('MAGIC_LINK_SECRET is not defined');
  }
  const emailBody = `<html>
    <body style="font-family: sans-serif; align: center">
      <p>Děkujeme za přihlášení!</p>
      <p>Prosíme potvrďte emailovou adresu kliknutím na link níže:</p>
      <p>
        <a href="{{confirmationLink}}" style="display: inline-block; text-decoration:none; border: none; border-radius: 4px; color: white; background-color: #0070f4; padding: 12px 20px; font-size: 16px; cursor: pointer;">
          Ověřit email
        </a>
      </p>
    </body>
  </html>`;
  return new MagicLoginStrategy({
    callbackUrl: `${OAUTH_CALLBACK_URL}/api/auth/magiclogin/callback`,
    secret: process.env.MAGIC_LINK_SECRET,
    sendMagicLink: async (destination, href) => {
      await sendEmail(
        destination,
        'Volební kalkulačka - přihlášení',
        emailBody.replace('{{confirmationLink}}', href),
        `Prosíme potvrďte emailovou adresu otevřením adresy: ${href}`
      );
    },
    verify: (payload, cb) => {
      return getStrategyCallback('magiclogin')(null, null, payload, cb);
    },
    jwtOptions: {
      expiresIn: process.env.MAGIC_LINK_EXPIRATION || '2 days',
    },
  });
};

const callback = (provider: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(provider, { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.redirect('/' + '?error=' + err?.message);
      }
      req.login(user, { session: false }, async (err) => {
        if (err) {
          console.error(err);
          return res.status(400).send({ err: err?.message || err });
        }
        try {
          const payload = {
            iss: PUBLIC_URL,
            sub: user.id,
            email: user.email || undefined,
          };
          const token = sign(
            payload,
            Buffer.from(process.env.JWT_SECRET as string, 'base64'),
            {
              expiresIn: process.env.JWT_EXPIRES_IN || '7d',
            }
          );
          const cookiePayload = { token };
          const expiresInDate = new Date(
            Date.now() + ms(process.env.JWT_EXPIRES_IN || '7d')
          );
          res.cookie('auth', JSON.stringify(cookiePayload), {
            domain: process.env.DOMAIN_NAME,
            path: '/api',
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: 'strict',
            expires: expiresInDate,
          });
        } catch (err) {
          console.error(err);
          return res.status(400).send({ err: err?.message || err });
        }

        const { state } = req.query;
        if (state) {
          const { returnTo, updateToken, answerId } = JSON.parse(
            Buffer.from(state as string, 'base64').toString()
          );
          if (updateToken && answerId) {
            await assignAnswerToUser({
              answerId,
              updateToken,
              userId: user.id,
            });
          }
          return redirectAfterCallback(returnTo, res);
        }
        redirectAfterCallback('/', res);
      });
    })(req, res, next);
  };
};

const authenticate = (options: { provider: string; scope: string[] }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { provider, scope } = options;
    const { returnTo, updateToken, answerId } = req.query;
    const state =
      returnTo || (updateToken && answerId)
        ? Buffer.from(
            JSON.stringify({ returnTo, updateToken, answerId })
          ).toString('base64')
        : undefined;
    const authenticator = passport.authenticate(provider, {
      state,
      scope,
    });
    return authenticator(req, res, next);
  };
};

for (const provider in providers) {
  if (providers[provider].enabled) {
    // Initialize routes for each provider
    passport.use(providers[provider].strategy());
    const scope = providers[provider].scope;
    app.get(`/api/auth/${provider}`, authenticate({ provider, scope }));
    app.get(`/api/auth/${provider}/callback`, callback(provider));
  }
}

if (
  process.env.MAGIC_LINK_SECRET &&
  process.env.EMAIL_SERVER_HOST &&
  process.env.EMAIL_SERVER_PORT
) {
  const magicLogin = getMagicLogin();
  passport.use(magicLogin);

  app.post('/api/auth/magiclogin', magicLogin.send);
  app.get('/api/auth/magiclogin/callback', callback('magiclogin'));
}

app.get('/api/auth/logout', (req, res) => {
  let redirect = req.query.returnTo;
  if (typeof redirect !== 'string' || !redirect.startsWith('/')) {
    redirect = '/';
  } else {
    redirect = decodeURIComponent(redirect);
  }
  res.clearCookie('auth', {
    domain: process.env.DOMAIN_NAME,
    path: '/api',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  });
  res.redirect(decodeURIComponent(redirect));
});

app.get('/*', (req, res) => {
  respond404(res, req.url);
});

export default function (req: VercelRequest, res: VercelResponse) {
  // This reads request readable stream and parses it as JSON
  // Needed for parsing request body in Vercel
  const { body } = req;
  return app(req, res);
}
