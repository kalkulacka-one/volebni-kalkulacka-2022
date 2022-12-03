import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    console.log(req.body);

    const json = req.body as Prisma.JsonObject;

    const result = await prisma.result.create({
      data: {
        value: json,
      },
    });
    return res.json(result.id);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
