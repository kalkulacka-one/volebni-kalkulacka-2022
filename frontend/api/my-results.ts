import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient, Prisma } from '@prisma/client';
import { verify } from 'jsonwebtoken';

export interface MyResultsInterface {
  result_ids: string[];
}

const prisma = new PrismaClient();

function authUser(req: VercelRequest, res: VercelResponse) {
  const token = req.headers.authorization?.split(' ')[1];
  const secret = process.env.JWT_SECRET as string;
  const userData = verify(token as string, secret) as { userId: string };
  return prisma.user.findUniqueOrThrow({where: {id: BigInt(userData.userId)}});
}


export default async function (req: VercelRequest, res: VercelResponse) {
  try {
    const user = await authUser(req, res);

    if (req.method === 'GET') {
      const results = await prisma.result.findMany({
        where: {
          userId: user.id,
        }
      });
      res.send({ results: results })
    }
    if (req.method === 'POST') {
      await prisma.result.create({data: {userId: user.id, resultId: req.body.resultId}})
      res.status(201)
    }
  } catch (err) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
}