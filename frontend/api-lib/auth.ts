import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient, Prisma } from '@prisma/client';
import { verify } from 'jsonwebtoken';

const prisma = new PrismaClient();

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
