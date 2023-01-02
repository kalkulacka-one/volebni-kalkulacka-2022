import type { VercelRequest, VercelResponse } from '@vercel/node';
import { authUser } from '../src/server/auth';
import { respond401 } from '../src/server/errors';

export default async function (req: VercelRequest, res: VercelResponse) {
  try {
    const user = await authUser(req, res);
    if (user) {
      return res.send({ user: user });
    }
    return respond401(res, 'No auth cookie.');
  } catch (err) {
    return respond401(res);
  }
}
