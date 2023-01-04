import passport from 'passport';
import { sign } from 'jsonwebtoken';
import express, { Express, Request, Response, NextFunction } from 'express';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import type { Profile } from 'passport';
import { prisma } from '../../src/server/prisma';
import { getPublicUrl } from '../../src/server/utils';
import { assignAnswerToUser } from '../../src/server/answers';
import ms from 'ms';
import { respond404 } from '../../src/server/errors';

const app: Express = express();

const PUBLIC_URL = getPublicUrl();
const OAUTH_CALLBACK_URL = process.env.OAUTH_CALLBACK_URL || PUBLIC_URL;

const providers = {
  facebook: {
    strategy: () => {
      return new FacebookStrategy(
        {
          clientID: process.env['FACEBOOK_CLIENT_ID'] as string,
          clientSecret: process.env['FACEBOOK_CLIENT_SECRET'] as string,
          profileFields: ['id', 'displayName', 'email', 'gender'],
          callbackURL: `${OAUTH_CALLBACK_URL}/api/auth/facebook/callback`,
        },
        getStrategyCallback('facebook')
      );
    },
    enabled: !!(
      process.env['FACEBOOK_CLIENT_ID'] && process.env['FACEBOOK_CLIENT_SECRET']
    ),
  },
  google: {
    strategy: () => {
      return new GoogleStrategy(
        {
          clientID: process.env['GOOGLE_CLIENT_ID'] as string,
          clientSecret: process.env['GOOGLE_CLIENT_SECRET'] as string,
          callbackURL: `${OAUTH_CALLBACK_URL}/api/auth/google/callback`,
        },
        getStrategyCallback('google')
      );
    },
    enabled: !!(
      process.env['GOOGLE_CLIENT_ID'] && process.env['GOOGLE_CLIENT_SECRET']
    ),
  },
  twitter: {
    strategy: () => {
      return new TwitterStrategy(
        {
          consumerKey: process.env['TWITTER_CONSUMER_KEY'] as string,
          consumerSecret: process.env['TWITTER_CONSUMER_SECRET'] as string,
          callbackURL: `${OAUTH_CALLBACK_URL}/api/auth/twitter/callback`,
        },
        getStrategyCallback('twitter')
      );
    },
    enabled: !!(
      process.env['TWITTER_CONSUMER_KEY'] &&
      process.env['TWITTER_CONSUMER_SECRET']
    ),
  },
};

const getStrategyCallback = (strategy: string) => {
  return async (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    cb: (error: any, user?: any, info?: any) => void
  ) => {
    if (!profile.emails || !profile.emails.length || !profile.emails[0].value) {
      // This is for facebook user, which doesn't have email
      try {
        const user = await prisma.user.upsert({
          where: {
            authProviderId: profile.id,
          },
          update: {
            authProvider: strategy,
            authProviderId: profile.id,
            name: profile.displayName,
          },
          create: {
            email: null,
            name: profile.displayName,
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
      const email = profile.emails[0].value;
      const user = await prisma.user.upsert({
        where: {
          email: email,
        },
        update: {
          authProvider: strategy,
          authProviderId: profile.id,
          name: profile.displayName,
        },
        create: {
          email: email,
          name: profile.displayName,
          authProvider: strategy,
          authProviderId: profile.id,
        },
      });
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  };
};

const callback = (provider: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(provider, { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.redirect('/' + '?error=' + err?.message);
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          console.error(err);
          return res.status(400).send({ err: err?.message || err });
        }
        try {
          const payload = {
            iss: PUBLIC_URL,
            sub: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          };
          const token = sign(payload, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_EXPIRES_IN || '7d',
          });
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

        try {
          const { state } = req.query;
          if (state) {
            const { returnTo, updateToken, answerId } = JSON.parse(
              Buffer.from(state as string, 'base64').toString()
            );
            if (updateToken && answerId) {
              assignAnswerToUser({ answerId, updateToken, userId: user.id });
            }
            if (typeof returnTo === 'string' && returnTo.startsWith('/')) {
              return res.redirect(returnTo);
            }
          }
        } catch {
          // just redirect normally below
        }
        res.redirect('/?login=loginsuccess-default');
      });
    })(req, res, next);
  };
};

const authenticate = (options) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { provider } = options;
    const { returnTo, updateToken, answerId } = req.query;
    const state =
      returnTo || (updateToken && answerId)
        ? Buffer.from(
            JSON.stringify({ returnTo, updateToken, answerId })
          ).toString('base64')
        : undefined;
    const authenticator = passport.authenticate(provider, {
      scope: ['email'],
      state,
    });
    return authenticator(req, res, next);
  };
};

for (const provider in providers) {
  if (providers[provider].enabled) {
    // Initialize routes for each provider
    passport.use(providers[provider].strategy());
    app.get(`/api/auth/${provider}`, authenticate({ provider }));
    app.get(`/api/auth/${provider}/callback`, callback(provider));
  }
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

module.exports = app;
