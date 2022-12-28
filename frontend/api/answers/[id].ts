import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../../src/server/prisma';
import { errorRespond, respond404, respond405 } from '../../src/server/errors';

export default async function (req: VercelRequest, res: VercelResponse) {
  const resultId = req.query.id as string;
  if (req.method === 'GET') {
    const result = await prisma.answers.findUnique({
      where: { id: resultId },
      select: {
        id: true,
        answers: true,
        matches: true,
        createdAt: true,
        updatedAt: true,
        calculatorId: true,
      },
    });
    if (result === null) {
      return respond404(res, 'answer', resultId);
    } else {
      return res.json(result);
    }
  } else if (req.method === 'PATCH') {
    const answers = req.body.answers;
    const matches = req.body.matches;
    const updateToken = req.body.updateToken;
    const existingResult = await prisma.answers.findUnique({
      where: { id: resultId },
    });

    if (existingResult === null) {
      return respond404(res, 'answer', resultId);
    }
    if (existingResult.updateToken !== updateToken) {
      return errorRespond(
        res,
        403,
        'https://volebnikalkulacka.cz/api/errors/invalid-update-token',
        'Invalid update token',
        'updateToken from body does not match the updateToken of the existing answer'
      );
    }

    const result = await prisma.answers.update({
      where: { id: resultId },
      data: {
        answers: answers,
        matches: matches,
      },
    });
    return res.json(result);
  } else {
    respond405(res, req.method);
  }
}
