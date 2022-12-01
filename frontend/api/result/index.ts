import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req: VercelRequest, res: VercelResponse) {
  // const { value } = req.body;

  var json = req.body as Prisma.JsonObject;

  const result = await prisma.result.create({
    data: {
      userId: 4,
      value: json,
    },
  });
  res.json(result);
}
