import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: string | string[];
  name: string;
};

const users = [{ id: 1 }, { id: 2 }, { id: 3 }];

export default function howToHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    query: { id, name },
    method,
  } = req;

  switch (method) {
    case "GET":
      // Get data from your database
      res.status(200).json({ id, name: `User ${id}` });
      break;
    case "POST":
      // Update or create data in your database
      res.status(200).json({ id, name: `User ${id}` });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
