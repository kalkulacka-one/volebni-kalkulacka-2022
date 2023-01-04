import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verify } from 'jsonwebtoken';
import { prisma } from './prisma';
import { prismaErrorHandler } from './errors';
import type { User } from '@prisma/client';
import { getPublicUrl } from './utils';

export async function authUser(
  req: VercelRequest,
  res: VercelResponse
): Promise<{ user: User; exp: number } | null> {
  const tokenString = req.cookies.auth;
  const PUBLIC_URL = getPublicUrl();
  if (!tokenString) {
    return null;
  }
  try {
    const parsed = JSON.parse(tokenString);
    const token = parsed.token;
    const secret = process.env.JWT_SECRET as string;
    const { sub, exp, iss } = verify(token as string, secret) as {
      sub: string;
      exp: number;
      iss: string;
    };
    if (iss !== PUBLIC_URL) {
      return null;
    }
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: sub },
    });
    return { user, exp };
  } catch (err) {
    return null;
  }
}
