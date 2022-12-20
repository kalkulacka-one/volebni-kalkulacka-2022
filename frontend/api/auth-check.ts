import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verify } from 'jsonwebtoken';
import { patchBigInt } from '../api-lib/utils';
import { PrismaClient } from '@prisma/client';
import { authUser } from '../api-lib/auth';

patchBigInt();
const prisma = new PrismaClient();

export default async function (req: VercelRequest, res: VercelResponse) {
  try {
    const user = await authUser(req);
    res.send({ user: user });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ error: 'Unauthorized', msg: err.message });
  }
}
