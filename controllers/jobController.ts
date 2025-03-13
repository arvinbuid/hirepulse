import "express-async-errors";
import {Request, Response, NextFunction} from "express";
import {StatusCodes} from "http-status-codes";

import Job from "../models/JobModel.ts";

export const getAllJobs = async (req: Request, res: Response) => {
  const jobs = await Job.find();

  res.status(StatusCodes.OK).json({jobs});
};

export const getJob = async (req: Request, res: Response) => {
  const {id} = req.params;

  const job = await Job.findById(id);

  if (!job) {
    res.status(StatusCodes.NOT_FOUND).json({message: `No job with id ${id}`});
    return;
  }

  res.status(StatusCodes.OK).json({job});
};

export const postCreateJob = async (req: Request, res: Response) => {
  const {company, position} = req.body;

  const job = await Job.create({company, position});
  res.status(StatusCodes.CREATED).json({job});
};

export const updateJob = async (req: Request, res: Response) => {
  const {id} = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {new: true});

  if (!updatedJob) {
    res.status(StatusCodes.NOT_FOUND).json({message: `No job with id ${id}`});
    return;
  }

  res.status(StatusCodes.OK).json({message: "Job updated successfully", job: updatedJob});
};

export const deleteJob = async (req: Request, res: Response) => {
  const {id} = req.params;

  const removedJob = await Job.findByIdAndDelete(id);

  if (!removedJob) {
    res.status(StatusCodes.NOT_FOUND).json({message: `No job with id ${id}`});
    return;
  }

  res.status(StatusCodes.NO_CONTENT).json({message: "Job deleted"});
};
