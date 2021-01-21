import auth0 from '../../utils/auth0';
import { NextApiRequest } from '../../../node_modules/next';

function patchReqForCallback(req: NextApiRequest): NextApiRequest {
  const { state } = req.query;

  if (typeof state === 'string') {
    req.cookies['a0:state'] = state;
  }

  return req;
}

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(patchReqForCallback(req), res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
