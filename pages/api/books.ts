import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
   if (req.method === 'GET') {
      const results = await fetch(`${process.env.AWS_API_ENDPOINT}/books`);
      const datas = await results.json();
      res.status(200).send(datas);
   }
};
