import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient, Prisma } from '@prisma/client';
import { authUser } from '../../api-lib/auth';
import { patchBigInt } from '../../api-lib/utils';

patchBigInt();
const prisma = new PrismaClient();

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const value = req.body.value as Prisma.JsonObject;
    const id = req.body.id;
    const userId = req.body.userId;

    if (userId) {
      // If userId is provided, check that the user is authorized
      try {
        const user = authUser(req);
      } catch (err) {
        return res
          .status(401)
          .send({ error: 'Unauthorized', msg: err.message });
      }
      // data = {...data, userId: userId};
    }

    if (!id) {
      // Create new result
      const createInput: Prisma.ResultCreateInput = {
        value: value,
      };
      const result = await prisma.result.create({ data: createInput });
      return res.json(result.id);
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
