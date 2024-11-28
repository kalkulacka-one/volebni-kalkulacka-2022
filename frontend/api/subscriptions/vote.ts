import type { VercelRequest, VercelResponse } from '@vercel/node';

import { respond401, respond405 } from '../../src/server/errors';

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { vote, calculatorId } = req.body;

    if (!vote || !calculatorId) {
      return respond401(res, 'Email, vote, and calculatorId are required.');
    }

    console.info(`Vote: ${vote}, calculatorId: ${calculatorId}`);

    // const subscriberVote = await prisma.subscriberVote.create({
    //     data: {
    //         subEmail: email,
    //         vote,
    //         calculatorId,
    //     },
    // });

    return res.status(201);
  } else {
    return respond405(res, req.method);
  }
}
