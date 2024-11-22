import type { VercelRequest, VercelResponse } from '@vercel/node';

import { prisma } from '../../src/server/prisma';
import { respond401, respond405 } from '../../src/server/errors';

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { email, vote, calculatorId } = req.body;

    if (!vote || !calculatorId) {
      return respond401(res, 'Email, vote, and calculatorId are required.');
    }

    const subscriberVote = await prisma.subscriberVote.create({
        data: {
            subEmail: email,
            vote,
            calculatorId,
        },
    });

    return res.status(201).json(subscriberVote);
  } else {
    return respond405(res, req.method);
  }
}
