import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  answer: string;
};

export default function howToHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { body, method } = req;

  switch (method) {
    case "POST":
      // Update or create data in your database
      res.status(200).json({ answer: `${body.question}` });
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
