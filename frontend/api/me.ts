import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../src/server/prisma';
import { authUser } from '../src/server/auth';
import {
  respond401,
  respond405,
  prismaErrorHandler,
} from '../src/server/errors';

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const user = await authUser(req, res);
      if (user) {
        return res.send({ user: user });
      }
      return respond401(res, 'No auth cookie.');
    } catch (err) {
      return respond401(res);
    }
  } else if (req.method === 'DELETE') {
    const user = await authUser(req, res);
    if (user) {
      await prisma.$transaction([
        prisma.answers.updateMany({
          where: { userId: user.id },
          data: { userId: null },
        }),
        prisma.user.delete({ where: { id: user.id } }),
      ]);
      return res.status(204).send(null);
    }
    return respond401(res, 'No auth cookie.');
  }
  return respond405(res, 'Method not allowed.');
}
