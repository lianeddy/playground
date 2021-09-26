import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import { NextApiRequest, NextApiResponse } from "next";
import challenges from "./challenges.json";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "PUT", "PATCH"],
  })
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  switch (req.method) {
    case "GET":
      if (req.query.studentId) {
        const queryFilter = challenges.filter(
          (val) => val.reviewerId === req.query.studentId
        );
        return res.status(200).send(queryFilter);
      }
      return res.status(200).send(challenges);
    default:
      return res.status(404).send("NOT FOUND");
  }
};
