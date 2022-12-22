import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../../src/server/prisma';
import { errorRespond, respond404 } from '../../src/server/errors';

export default async function (req: VercelRequest, res: VercelResponse) {
  const resultId = req.query.id as string;
  if (req.method === 'GET') {
    const result = await prisma.answers.findUnique({
      where: { id: resultId },
      select: {
        id: true,
        value: true,
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
    const value = req.body.value;
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
        value: value,
      },
    });
    return res.json(result);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
