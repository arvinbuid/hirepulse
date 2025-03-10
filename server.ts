import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

import {nanoid} from "nanoid";

dotenv.config();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

let jobs = [
  {id: nanoid(), name: "Software Engineer", company: "Google"},
  {id: nanoid(), name: "Web Developer", company: "Microsoft"},
];

app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json({jobs});
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.json({message: "Data received", data: req.body});
});

const port = process.env.PORT || 5100;
app.listen(port, () => console.log(`Server running on port ${port}...`));
