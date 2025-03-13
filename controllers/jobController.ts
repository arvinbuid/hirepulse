import "express-async-errors";

import {Request, Response, NextFunction} from "express";
import {nanoid} from "nanoid";

import Job from "../models/JobModel.ts";

let jobs = [
  {id: nanoid(), name: "Software Engineer", company: "Google"},
  {id: nanoid(), name: "Web Developer", company: "Microsoft"},
];

export const getAllJobs = async (req: Request, res: Response) => {
  const jobs = await Job.find();

  res.status(200).json({jobs});
};

export const getJob = async (req: Request, res: Response) => {
  const {id} = req.params;

  const job = await Job.findById(id);

  if (!job) {
    res.status(404).json({message: `No job with id ${id}`});
    return;
  }

  res.status(200).json({job});
};

export const postCreateJob = async (req: Request, res: Response) => {
  const {company, position} = req.body;

  const job = await Job.create({company, position});
  res.status(200).json({job});
};

export const editJob = (req: Request, res: Response) => {
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
};

export const deleteJob = (req: Request, res: Response) => {
  const {id} = req.params;

  const job = jobs.find((job) => job.id === id);

  if (!job) {
    res.status(404).json({message: `No job with id ${id}`});
    return;
  }

  const deletedJob = jobs.filter((job) => job.id !== id);
  jobs = deletedJob;

  res.status(204).json({message: "Job deleted"});
};
