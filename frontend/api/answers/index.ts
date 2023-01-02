import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Prisma } from '@prisma/client';
import { prisma, getBody } from '../../src/server/prisma';
import { authUser } from '../../src/server/auth';
import { respond405, prismaErrorHandler } from '../../src/server/errors';

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const body = getBody(req, res);
    const answers = body.answers as Prisma.JsonObject;
    const matches = body.matches as Prisma.JsonObject;
    const user = await authUser(req, res);
    const result = await prisma.answers
      .create({
        data: {
          answers: answers,
          matches: matches,
          source: req.body.source,
          embedName: req.body.embedName,
          calculatorId: req.body.calculatorId,
          userId: user?.id,
        },
      })
      .catch(prismaErrorHandler(res));
    return res.json(result);
  } else {
    respond405(res, req.method);
  }
}
