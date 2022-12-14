import passport from 'passport';
import { PrismaClient, Prisma } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import express, { Express, Request, Response, NextFunction } from 'express';
import { Strategy as FacebookStrategy } from 'passport-facebook';

const app: Express = express();
const prisma = new PrismaClient();

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const BASE_URL = process.env['BASE_URL'] || 'http://localhost:3000';

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env['FACEBOOK_ID'] || '',
      clientSecret: process.env['FACEBOOK_SECRET'] || '',
      callbackURL: `${BASE_URL}/api/auth/facebook/callback`,
      profileFields: ['id', 'displayName', 'email'],
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.warn('profile', profile);
      if (
        !profile.emails ||
        !profile.emails.length ||
        !profile.emails[0].value
      ) {
        return cb(null, false, { message: 'No email provided' });
      }
      try {
        const email = profile.emails[0].value;
        const user = await prisma.user.upsert({
          where: {
            email: email,
          },
          update: {
            authProvider: 'facebook',
            authProviderId: profile.id,
            name: profile.displayName,
          },
          create: {
            email: email,
            name: profile.displayName,
            authProvider: 'facebook',
            authProviderId: profile.id,
          },
        });
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

const loginFacebook = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('facebook', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.redirect('/' + '/?error=' + info.message);
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.status(400).send({ err });
      }
      const payload = {
        iss: BASE_URL,
        sub: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      const token = sign(payload, process.env.JWT_SECRET as string);
      const cookiePayload = { user, token };
      res.cookie('auth', JSON.stringify(cookiePayload), {
        domain: process.env.DOMAIN_NAME,
      });
      res.redirect(process.env.VERCEL_URL + '/?login=loginsuccess');
    });
  })(req, res, next);
};

app.get(
  '/api/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

app.get('/api/auth/facebook/callback', loginFacebook);

app.get('/api/auth/ddd', (req, res) => {
  res.end(`ddd`);
});

app.get('/*', (req, res) => {
  res.end(`Hello! Go to item: ${req.url}`);
});

module.exports = app;
