import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../src/server/prisma';
import { User } from '@prisma/client';
import { authUser } from '../src/server/auth';
import {
  respond401,
  respond405,
  prismaErrorHandler,
} from '../src/server/errors';

export default async function (req: VercelRequest, res: VercelResponse) {
  let user: void | User | null;
  try {
    user = await authUser(req, res);
  } catch (err) {
    return respond401(res);
  }

  if (!user) {
    return respond401(res, 'User not found.');
  }

  if (req.method === 'GET') {
    return res.send({ user: user });
  } else if (req.method === 'DELETE') {
    await prisma
      .$transaction([
        prisma.answers.updateMany({
          where: { userId: user.id },
          data: { userId: null },
        }),
        prisma.user.delete({ where: { id: user.id } }),
      ])
      .catch(prismaErrorHandler(res));
    return res.status(204).send(null);
  }

  respond405(res, req.method);
}
