import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import { NextApiRequest, NextApiResponse } from "next";
import challenges from "../api/challenges.json";
import fs from "fs";
import path from "path";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "PUT", "PATCH"],
  })
);

const filePath = path.join(__dirname, "challenges.json");

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  switch (req.method) {
    case "GET":
      if (req.query.studentId) {
        const queryFilter = challenges.filter(
          (val) => val.studentId === req.query.studentId
        );
        return res.status(200).send(queryFilter);
      }
      return res.status(200).send(challenges);
    case "POST":
      const editedData = challenges;
      req.body.id = challenges.length + 1;
      editedData.push(req.body);
      fs.writeFileSync("./pages/api/challenges.json", JSON.stringify(editedData));
      const queryFilter = challenges.filter(
        (val) => val.studentId === req.query.studentId
      );
      console.log(challenges);
      return res.status(200).send(queryFilter);
    case "PUT":
      try {
        const editedData = challenges;
        const selectedData = challenges.find((val) => {
          return val.id === req.body.selectedChallengeId;
        });
        const selectedDataIdx = challenges.findIndex((val) => {
          return val.id === req.body.selectedChallengeId;
        });
        selectedData.reviewerId = req.body.reviewerId;
        editedData[selectedDataIdx] = selectedData;
        fs.writeFileSync("./pages/api/challenges.json", JSON.stringify(editedData));
        const response = fs.readFileSync("./pages/api/challenges.json");
        // fs.writeFile("challenges.json", JSON.stringify(editedData), (err) => {
        //   if (err) return res.status(500).send(err);
        //   console.log("File written successfully\n");
        //   console.log("The written has the following contents:");
        //   console.log(fs.readFileSync("challenges.json", "utf8"));
        // });
        return res.status(200).send(response);
      } catch (err) {
        return res.status(500).send(err);
      }
    case "PATCH":
      try {
        const editedData = challenges;
        const selectedData = challenges.find((val) => {
          return val.id === req.body.selectedChallengeId;
        });
        const selectedDataIdx = challenges.findIndex((val) => {
          return val.id === req.body.selectedChallengeId;
        });
        selectedData.gradingStatus = req.body.gradingStatus;
        selectedData.grade = parseInt(req.body.gradeValue);
        editedData[selectedDataIdx] = selectedData;
        fs.writeFileSync("./pages/api/challenges.json", JSON.stringify(editedData));
        const response = fs.readFileSync("./pages/api/challenges.json");
        // fs.writeFile("challenges.json", JSON.stringify(editedData), (err) => {
        //   if (err) return res.status(500).send(err);
        //   console.log("File written successfully\n");
        //   console.log("The written has the following contents:");
        //   console.log(fs.readFileSync("challenges.json", "utf8"));
        // });
        return res.status(200).send(response);
      } catch (err) {
        return res.status(500).send(err);
      }
    default:
      return res.status(404).send("NOT FOUND");
  }
};
