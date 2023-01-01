import { PrismaClient } from '@prisma/client';
import type { VercelResponse, VercelRequest } from '@vercel/node';
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
    ? `${process.env.DATABASE_URL_BASE}/${process.env.VERCEL_GIT_COMMIT_SHA}`
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
