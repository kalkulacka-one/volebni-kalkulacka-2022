import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req: VercelRequest, res: VercelResponse) {
  // const { value } = req.body;
  const resultId = req.query.id as string;
  if (req.method === 'GET') {
    const result = await prisma.result.findFirstOrThrow({
      where: { id: BigInt(resultId) },
    });
    res.json(result);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
