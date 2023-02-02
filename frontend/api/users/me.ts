import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../../src/server/prisma';
import { User } from '@prisma/client';
import { authUser } from '../../src/server/auth';
import {
  respond401,
  respond405,
  prismaErrorHandler,
} from '../../src/server/errors';

export default async function (req: VercelRequest, res: VercelResponse) {
  let auth: null | { user: User; exp: number } = null;
  try {
    auth = await authUser(req, res);
  } catch (err) {
    return respond401(res);
  }
  if (!auth) {
    return respond401(res, 'User not found.');
  }

  if (req.method === 'GET') {
    return res.send(auth);
  } else if (req.method === 'DELETE') {
    await prisma.user
      .delete({ where: { id: auth.user.id } })
      .catch(prismaErrorHandler(res));
    return res.status(204).send(null);
  } else if (req.method === 'PUT') {
    const { displayName, email } = req.body;
    if (!displayName || !email) {
      return respond401(res, 'Name and email are required.');
    }
    await prisma.user
      .update({
        where: { id: auth.user.id },
        data: { displayName, email },
      })
      .catch(prismaErrorHandler(res));
    return res.status(204).send(null);
  }

  respond405(res, req.method);
}
