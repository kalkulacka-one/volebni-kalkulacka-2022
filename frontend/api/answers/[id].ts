import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma, getBody } from '../../src/server/prisma';
import { authUser } from '../../src/server/auth';
import {
  errorRespond,
  respond404,
  respond405,
  prismaErrorHandler,
} from '../../src/server/errors';

export default async function (req: VercelRequest, res: VercelResponse) {
  const resultId = req.query.id as string;
  if (req.method === 'GET') {
    const result = await prisma.answers
      .findUnique({
        where: { id: resultId },
        select: {
          id: true,
          answers: true,
          matches: true,
          createdAt: true,
          updatedAt: true,
          calculatorId: true,
        },
      })
      .catch(prismaErrorHandler(res));
    if (result === null) {
      return respond404(res, 'answer', resultId);
    } else {
      return res.json(result);
    }
  } else if (req.method === 'PATCH') {
    const auth = await authUser(req, res);
    const body = getBody(req, res);
    const answers = body.answers;
    const matches = body.matches;
    const updateToken = req.body.updateToken;
    const existingResult = await prisma.answers
      .findUniqueOrThrow({
        where: { id: resultId },
      })
      .catch(prismaErrorHandler(res));

    if (!existingResult) {
      return respond404(res, 'answer', resultId);
    } else if (existingResult?.userId && !auth) {
      return errorRespond(
        res,
        401,
        'https://volebnikalkulacka.cz/api/errors/invalid-user',
        'Invalid user',
        'You need to log in to update this answer'
      );
    } else if (auth && existingResult?.userId !== auth.user.id) {
      return errorRespond(
        res,
        403,
        'https://volebnikalkulacka.cz/api/errors/invalid-user',
        'Invalid user',
        'User is not the owner of the answer'
      );
    } else if (existingResult?.updateToken !== updateToken) {
      return errorRespond(
        res,
        401,
        'https://volebnikalkulacka.cz/api/errors/invalid-update-token',
        'Invalid update token',
        'updateToken from body does not match the updateToken of the existing answer'
      );
    }

    const result = await prisma.answers
      .update({
        where: { id: resultId },
        data: {
          answers: answers,
          matches: matches,
          userId: auth?.user?.id,
        },
      })
      .catch(prismaErrorHandler(res));
    return res.json(result);
  } else {
    respond405(res, req.method);
  }
}
