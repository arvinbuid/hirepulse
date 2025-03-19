import "express-async-errors";
import {Request, Response, NextFunction} from "express";
import {StatusCodes} from "http-status-codes";

import Job from "../models/JobModel.ts";

export const getAllJobs = async (req: Request, res: Response) => {
  const jobs = await Job.find({createdBy: req.user?.userId});

  res.status(StatusCodes.OK).json({jobs});
};

export const getJob = async (req: Request, res: Response) => {
  const job = req.job;

  res.status(StatusCodes.OK).json({job});
};

export const postCreateJob = async (req: Request, res: Response) => {
  req.body.createdBy = req.user?.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({job});
};

export const updateJob = async (req: Request, res: Response) => {
  const {id} = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {new: true});

  res.status(StatusCodes.OK).json({message: "Job updated successfully", job: updatedJob});
};

export const deleteJob = async (req: Request, res: Response) => {
  const {id} = req.params;

  await Job.findByIdAndDelete(id);

  res.status(StatusCodes.NO_CONTENT).json({message: "Job deleted"});
};
