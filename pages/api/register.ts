import { NextApiRequest, NextApiResponse } from 'next';
import gotrueApi from '@config/api/gotrue';
import constants from '@config/constants';

export default async (req: NextApiRequest, res: NextApiResponse) => {
   if (req.method === 'POST') {
      try {
         if (!req.body.eula) {
            res.status(200).send({
               message: { content: 'You need to accept the EULA to create an account.', type: 'error' },
            });
            return;
         }

         if (!constants.regex.mail.test(req.body.mail)) {
            res.status(200).send({ message: { content: 'Email address is not valid.', type: 'warning' } });
            return;
         }

         if (!constants.regex.password.test(req.body.password)) {
            res.status(200).send({ message: { content: 'Password is not strong enough.', type: 'warning' } });
            return;
         }

         if (req.body.password !== req.body.confirmation) {
            res.status(200).send({
               message: { content: 'Password and confirmation do not match.', type: 'error' },
            });
            return;
         }

         const data = await gotrueApi.signup(req.body.mail, req.body.password, {
            pseudonym: req.body.pseudonym,
         });

         res.status(200).send({ data });
      } catch {
         res.status(200).send({
            message: {
               content: 'A user with this email address has already been registered.',
               type: 'error',
            },
         });
      }
   }
};
