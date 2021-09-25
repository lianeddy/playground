import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import { NextApiRequest, NextApiResponse } from "next";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "PUT"],
  })
);

const challenges = [
  {
    id: 1,
    studentId: "ABCDEF",
    name: "Michael",
    googleDriveFolder: "sample-url",
    gradingStatus:
      "UNSUBMITTED" || "SUBMITTED" || "GRADE_PASSED" || "GRADE_FAILED",
    grade: 1,
    reviewerId: "CEDFGH",
  },
];

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  switch (req.method) {
    case "GET":
      return res.status(200).send(challenges);
    case "POST":
      return res.status(200).send("POST");
    default:
      return res.status(404).send("NOT FOUND");
  }
};
