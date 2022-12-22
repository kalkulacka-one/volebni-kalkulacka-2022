import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Prisma } from '@prisma/client';
import { prisma } from '../../src/server/prisma';
import { respond405 } from '../../src/server/errors';

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const value = req.body.value as Prisma.JsonObject;
    const result = await prisma.answers.create({
      data: {
        value: value,
        source: req.body.source,
        embedName: req.body.embedName,
        calculatorId: req.body.calculatorId,
      },
    });
    return res.json(result);
  } else {
    respond405(res, req.method);
  }
}
