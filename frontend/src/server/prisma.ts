import { PrismaClient } from '@prisma/client';
import type { VercelResponse, VercelRequest } from '@vercel/node';
import { createHash } from 'crypto';
import type { VercelResponse, VercelRequest } from '@vercel/node';
import { respond400 } from './errors';

import { respond400 } from './errors';

export const patchBigInt = () => {
  // Monkey patch BigInt toJSON to return a string.
  // https://github.com/GoogleChromeLabs/jsbi/issues/30
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };
};

patchBigInt();

const connectionUrl =
  process.env.VERCEL_ENV === 'preview'
    ? process.env.VERCEL_GIT_COMMIT_REF === 'staging'
      ? `${process.env.DATABASE_URL_BASE}/staging`
      : `${process.env.DATABASE_URL_BASE}/${createHash('sha256')
          .update(process.env.VERCEL_GIT_COMMIT_REF as string)
          .digest('hex')}`
    : process.env.DATABASE_URL;

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: connectionUrl,
    },
  },
});

export const getBody = (req: VercelRequest, res: VercelResponse) => {
  try {
    return req.body;
  } catch (e) {
    respond400(res, 'JSON malformed.');
    throw e;
  }
};
