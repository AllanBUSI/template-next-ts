import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const DefaultHandler = nextConnect<NextApiRequest, NextApiResponse>({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  },
});
export default DefaultHandler;
