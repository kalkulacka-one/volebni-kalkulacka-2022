import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../../src/server/prisma';

export default async function (req: VercelRequest, res: VercelResponse) {
  const resultId = req.query.id as string;
  if (req.method === 'GET') {
    const result = await prisma.result.findUnique({
      where: { id: resultId },
      select: { id: true, value: true, createdAt: true },
    });
    if (result === null) {
      return res.status(404).json({ error: `Result ${resultId} not found` });
    } else {
      return res.json(result);
    }
  } else if (req.method === 'PATCH') {
    const value = req.body.value;
    const updateToken = req.body.updateToken;
    const existingResult = await prisma.result.findUnique({
      where: { id: resultId },
    });

    if (existingResult === null) {
      return res.status(404).json({ error: `Result ${resultId} not found` });
    }
    if (existingResult.updateToken !== updateToken) {
      return res.status(403).json({ error: `Invalid update token` });
    }

    const result = await prisma.result.update({
      where: { id: resultId },
      data: {
        value: value,
        source: req.body.embedSourceUrl,
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
