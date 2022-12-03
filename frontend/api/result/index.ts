import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req: VercelRequest, res: VercelResponse) {
  console.log(req.method);
  if (req.method === 'POST') {
    console.log(req.body);
    // const { value } = req.body;

    var json = req.body as Prisma.JsonObject;

    const result = await prisma.result.create({
      data: {
        value: json,
      },
    });
    res.json(result);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
