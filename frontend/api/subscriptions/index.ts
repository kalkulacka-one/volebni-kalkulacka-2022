import type { VercelRequest, VercelResponse } from '@vercel/node';

import { prisma } from '../../src/server/prisma';
import { respond401, respond405 } from '../../src/server/errors';

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return respond401(res, 'Email is required.');
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return respond401(res);
    }

    const user = await prisma.user.create({
      data: {
        email,
        subscribed: true,
      },
    });

    return res.status(201).json(user);
  } else {
    return respond405(res, req.method);
  }
}
