import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import { NextApiRequest, NextApiResponse } from "next";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "PUT"],
  })
);

const students = [
  {
    id: "MI-123",
    name: "Michael",
    email: "michael@mail.com",
  },
];

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  switch (req.method) {
    case "GET":
      return res.status(200).send(students);
    case "POST":
      return res.status(200).send("POST");
    default:
      return res.status(404).send("NOT FOUND");
  }
};
