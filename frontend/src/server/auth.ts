import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verify } from 'jsonwebtoken';
import { prisma } from './prisma';
import { prismaErrorHandler } from './errors';

export function authUser(req: VercelRequest, res: VercelResponse) {
  const tokenString = req.cookies.auth;
  if (!tokenString) {
    return null;
  }
  const parsed = JSON.parse(tokenString);
  const token = parsed.token;
  const secret = process.env.JWT_SECRET as string;
  const userData = verify(token as string, secret) as { sub: string };
  const user = prisma.user
    .findUnique({
      where: { id: userData.sub },
    })
    .catch(prismaErrorHandler(res));
  return user;
}
