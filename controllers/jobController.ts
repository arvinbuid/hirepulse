import "express-async-errors";
import {Request, Response, NextFunction} from "express";

import Job from "../models/JobModel.ts";

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

export const updateJob = async (req: Request, res: Response) => {
  const {id} = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {new: true});

  if (!updatedJob) {
    res.status(404).json({message: `No job with id ${id}`});
    return;
  }

  res.status(200).json({message: "Job updated successfully", job: updatedJob});
};

export const deleteJob = async (req: Request, res: Response) => {
  const {id} = req.params;

  const removedJob = await Job.findByIdAndDelete(id);

  if (!removedJob) {
    res.status(404).json({message: `No job with id ${id}`});
    return;
  }

  res.status(204).json({message: "Job deleted"});
};
