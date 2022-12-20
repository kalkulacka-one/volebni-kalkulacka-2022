import type { VercelRequest, VercelResponse } from '@vercel/node';
import { patchBigInt } from '../api-lib/utils';
import { authUser } from '../api-lib/auth';

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
