import passport from 'passport';
import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import express, { Express, Request, Response, NextFunction } from 'express';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { patchBigInt } from '../../api-lib/utils';

const app: Express = express();

patchBigInt();

const BASE_URL = process.env['BASE_URL'] || 'http://localhost:3000';

const providers = {
  facebook: {
    strategy: () => {
      return new FacebookStrategy(
        {
          clientID: process.env['FACEBOOK_CLIENT_ID'] as string,
          clientSecret: process.env['FACEBOOK_CLIENT_SECRET'] as string,
          profileFields: ['id', 'displayName', 'email'],
          callbackURL: `${BASE_URL}/api/auth/facebook/callback`,
        },
        getStrategyCallback('facebook')
      );
    },
    enabled:
      process.env['FACEBOOK_CLIENT_ID'] &&
      process.env['FACEBOOK_CLIENT_SECRET'],
  },
  google: {
    strategy: () => {
      return new GoogleStrategy(
        {
          clientID: process.env['GOOGLE_CLIENT_ID'] as string,
          clientSecret: process.env['GOOGLE_CLIENT_SECRET'] as string,
          callbackURL: `${BASE_URL}/api/auth/google/callback`,
        },
        getStrategyCallback('google')
      );
    },
    enabled:
      process.env['GOOGLE_CLIENT_ID'] && process.env['GOOGLE_CLIENT_SECRET'],
  },
  twitter: {
    strategy: () => {
      return new TwitterStrategy(
        {
          consumerKey: process.env['TWITTER_CONSUMER_KEY'] as string,
          consumerSecret: process.env['TWITTER_CONSUMER_SECRET'] as string,
          callbackURL: `${BASE_URL}/api/auth/twitter/callback`,
        },
        getStrategyCallback('twitter')
      );
    },
    enabled:
      process.env['TWITTER_CONSUMER_KEY'] &&
      process.env['TWITTER_CONSUMER_SECRET'],
  },
};

const getStrategyCallback = (strategy: string) => {
  return async (accessToken: string, refreshToken: string, profile, cb) => {
    //   console.warn('profile', profile);
    if (!profile.emails || !profile.emails.length || !profile.emails[0].value) {
      return cb(null, false, { message: 'No email provided' });
    }
    try {
      const prisma = new PrismaClient();
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

const loginWith = (provider: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(provider, { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.redirect('/' + '/?error=' + info.message);
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          return res.status(400).send({ err });
        }
        try {
          const payload = {
            iss: BASE_URL,
            sub: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          };
          const token = sign(payload, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_EXPIRES_IN || '7d',
          });
          const cookiePayload = { token };
          res.cookie('auth', JSON.stringify(cookiePayload), {
            domain: process.env.DOMAIN_NAME,
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: 'strict',
          });
          res.cookie('user', JSON.stringify(user));
        } catch (err) {
          return res.status(400).send({ err });
        }
        res.redirect(BASE_URL + '/?login=loginsuccess');
      });
    })(req, res, next);
  };
};

for (const provider in providers) {
  if (providers[provider].enabled) {
    // Initialize routes for each provider
    passport.use(providers[provider].strategy());
    app.get(
      `/api/auth/${provider}`,
      passport.authenticate(provider, { scope: ['email'] })
    );
    app.get(`/api/auth/${provider}/callback`, loginWith(provider));
  }
}

app.get('/*', (req, res) => {
  res.status(404).end(`404 - ${req.url}`);
});

module.exports = app;
