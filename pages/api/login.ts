import { NextApiRequest, NextApiResponse } from 'next';
import gotrueApi from '@config/api/gotrue';

export default async (req: NextApiRequest, res: NextApiResponse) => {
   if (req.method === 'POST') {
      let datas = {};
      let status = 200;

      try {
         datas = await gotrueApi.login(req.body.mail, req.body.password, req.body.remember);
      } catch {
         status = 401;
      } finally {
         res.status(status).send(datas);
      }
   }
};
