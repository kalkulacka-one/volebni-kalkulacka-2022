import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verify } from 'jsonwebtoken';
import { prisma } from './prisma';
import { prismaErrorHandler } from './errors';
import type { User } from '@prisma/client';

export async function authUser(
  req: VercelRequest,
  res: VercelResponse
): Promise<{ user: User; exp: number } | null> {
  const tokenString = req.cookies.auth;
  if (!tokenString) {
    return null;
  }
  try {
    const parsed = JSON.parse(tokenString);
    const token = parsed.token;
    const secret = process.env.JWT_SECRET as string;
    const { sub, exp } = verify(token as string, secret) as {
      sub: string;
      exp: number;
    };
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: sub },
    });
    return { user, exp };
  } catch (err) {
    return null;
  }
}
