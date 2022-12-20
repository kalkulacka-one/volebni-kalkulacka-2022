import type { VercelRequest } from '@vercel/node';
import { verify } from 'jsonwebtoken';
import { prisma } from '../src/server/prisma';

export function authUser(req: VercelRequest) {
  const tokenString = req.cookies.auth;
  if (!tokenString) {
    throw new Error('No token found');
  }
  const parsed = JSON.parse(tokenString);
  const token = parsed.token;
  const secret = process.env.JWT_SECRET as string;
  console.log(token, secret);
  const userData = verify(token as string, secret) as { sub: string };
  const user = prisma.user.findUniqueOrThrow({
    where: { id: BigInt(userData.sub) },
  });
  return user;
}
