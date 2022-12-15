import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Prisma } from '@prisma/client';
import { prisma } from '../src/server/prisma';

export default async function (req: VercelRequest, res: VercelResponse) {
  const { name = 'World' } = req.query;

  try {
    await prisma.user.create({
      data: {
        name: `${name}`,
        email: `${name}@prisma.io`,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        res.send(
          `A unique constraint would be violated on User. Details: ${e.meta?.details}`
        );
        return;
      }
    }

    res.send(`An unexpected error occured: ${e}`);
  }

  const allUsers = await prisma.user.findMany({});
  res.send(allUsers.map((user) => user.name));
}
