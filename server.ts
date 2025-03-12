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

app.post("/", (req, res) => {
  console.log(req.body);
  res.json({message: "Data received", data: req.body});
});

// GET all jobs
app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json({jobs});
});

// GET single job
app.get("/api/v1/jobs/:id", (req, res) => {
  const {id} = req.params;

  const job = jobs.find((job) => job.id === id);

  if (!job) {
    res.status(404).json({message: `No job with id ${id}`});
    return;
  }

  res.status(200).json({job});
});

// POST create job
app.post("/api/v1/jobs", (req, res) => {
  const {name, company} = req.body;

  if (!name || !company) {
    res.status(400).json({message: "Please provide all values"});
    return;
  }

  const id = nanoid(10);
  const job = {id, name, company};
  jobs.push(job);
  res.status(200).json({message: "Job created"});
});

// PATCH edit job
app.patch("/api/v1/jobs/:id", (req, res) => {
  const {name, company} = req.body;

  if (!name || !company) {
    res.status(400).json({message: "Please provide all values"});
    return;
  }

  const {id} = req.params;

  const job = jobs.find((job) => job.id === id);

  if (!job) {
    res.status(404).json({message: `No job with id ${id}`});
    return;
  }

  // Update job
  job.name = name;
  job.company = company;

  res.status(200).json({message: "Job edited successfully", job});
});

const port = process.env.PORT || 5100;
app.listen(port, () => console.log(`Server running on port ${port}...`));
