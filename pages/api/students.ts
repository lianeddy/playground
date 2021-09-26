import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import { NextApiRequest, NextApiResponse } from "next";
import students from "./students.json";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "PUT"],
  })
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  switch (req.method) {
    case "GET":
      if (req.query.id) {
        const queryFilter = students.find((val) => val.id === req.query.id);
        return res.status(200).send(queryFilter);
      }
      if (req.query.student_id) {
        const queryFilter = students.filter(
          (val) => val.id !== req.query.student_id
        );
        console.log(queryFilter);
        return res.status(200).send(queryFilter);
      }
      return res.status(200).send(students);
    case "POST":
      return res.status(200).send("POST");
    default:
      return res.status(404).send("NOT FOUND");
  }
};
