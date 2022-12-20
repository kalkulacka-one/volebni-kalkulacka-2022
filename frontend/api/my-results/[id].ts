import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../../src/server/prisma';

export default async function (req: VercelRequest, res: VercelResponse) {
  const resultId = req.query.id as string;
  if (req.method === 'GET') {
    const result = await prisma.result.findUnique({
      where: { id: BigInt(resultId) },
    });
    if (result === null) {
      return res.status(404).json({ error: `Result ${resultId} not found` });
    } else {
      return res.json(result);
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
