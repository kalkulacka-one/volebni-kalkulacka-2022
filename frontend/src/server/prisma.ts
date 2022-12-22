import { PrismaClient } from '@prisma/client';

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
