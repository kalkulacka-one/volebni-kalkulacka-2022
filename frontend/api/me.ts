import type { VercelRequest, VercelResponse } from '@vercel/node';
import { authUser } from '../src/server/auth';

export default async function (req: VercelRequest, res: VercelResponse) {
  try {
    const user = await authUser(req);
    return res.send({ user: user });
  } catch (err) {
    return res.status(401).send({ error: 'Unauthorized', msg: err.message });
  }
  res.status(404).send({ error: 'Not found' });
}
