import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient, Prisma } from '@prisma/client';
import { authUser } from '../../api-lib/auth';
import { patchBigInt } from '../../api-lib/utils';
import { prisma } from '../../src/server/prisma';

patchBigInt();

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const value = req.body.value as Prisma.JsonObject;
    const id = req.body.id;
    let userId = req.body.userId;

    if (userId) {
      // If userId is provided, check that the user is authorized and matches the userId
      try {
        userId = BigInt(userId);
        const user = await authUser(req);
        if (user.id !== userId) throw new Error('Unauthorized');
      } catch (err) {
        return res
          .status(401)
          .send({ error: 'Unauthorized', msg: err.message });
      }
    }

    if (!id) {
      // Create new result
      let createInput: Prisma.ResultCreateInput = {
        value: value,
      };
      if (userId) {
        createInput = { ...createInput, User: { connect: { id: userId } } };
      }
      const result = await prisma.result.create({ data: createInput });
      return res.json(result);
    } else {
      // Update existing result
      let updateInput: Prisma.ResultUpdateInput = {};
      if (value) {
        updateInput = { ...updateInput, value: value };
      }
      if (userId) {
        updateInput = { ...updateInput, User: { connect: { id: userId } } };
      }
      const result = await prisma.result.update({
        where: { id: BigInt(id) },
        data: updateInput,
      });
      return res.json(result);
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
