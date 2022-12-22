import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Prisma } from '@prisma/client';
import { prisma } from '../../src/server/prisma';
import { authUser } from '../../src/server/auth';

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const value = req.body.value as Prisma.JsonObject;
    const userId = req.body.userId;

    if (userId) {
      // If userId is provided, check that the user is authorized and matches the userId
      try {
        const user = await authUser(req);
        if (user.id !== userId) throw new Error('Unauthorized');
      } catch (err) {
        return res
          .status(401)
          .send({ error: 'Unauthorized', msg: err.message });
      }
    }

    const result = await prisma.result.create({
      data: {
        value: value,
        userId: userId,
        source: req.body.source,
        embedSourceUrl: req.body.embedSourceUrl,
      },
    });
    return res.json(result);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
