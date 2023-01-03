import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Prisma } from '@prisma/client';
import { prisma, getBody } from '../../src/server/prisma';
import { authUser } from '../../src/server/auth';
import {
  respond405,
  prismaErrorHandler,
  respond401,
} from '../../src/server/errors';

export async function assignAnswerToUser(
  answerId: string,
  usersUpdateToken: string,
  userId: string
) {
  try {
    const { updateToken } = await prisma.answers.findUniqueOrThrow({
      where: { id: answerId },
      select: { updateToken: true },
    });
    if (updateToken === usersUpdateToken) {
      await prisma.answers.update({
        where: { id: answerId },
        data: { userId: userId },
      });
      return true;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default async function (req: VercelRequest, res: VercelResponse) {
  const user = await authUser(req, res);
  if (req.method === 'GET') {
    if (!user) {
      console.log('User not found');
      return respond401(res);
    }
    const answers = await prisma.answers.findMany({
      where: { userId: user.id },
    });
    return res.json(answers);
  } else if (req.method === 'POST') {
    const body = getBody(req, res);
    const answers = body.answers as Prisma.JsonObject;
    const matches = body.matches as Prisma.JsonObject;
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
