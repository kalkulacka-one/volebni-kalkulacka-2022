import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verify } from 'jsonwebtoken';
import { patchBigInt } from '../api-lib/utils';
import { PrismaClient } from '@prisma/client';
import { authUser } from '../api-lib/auth';
import { prisma } from '../src/server/prisma';

patchBigInt();

export default async function (req: VercelRequest, res: VercelResponse) {
  try {
    const user = await authUser(req);
    res.send({ user: user });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ error: 'Unauthorized', msg: err.message });
  }
  res.status(404).send({ error: 'Not found' });
}
