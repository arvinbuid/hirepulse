import "express-async-errors";
import {Request, Response, NextFunction} from "express";
import {StatusCodes} from "http-status-codes";

import Job from "../models/JobModel.ts";
import mongoose from "mongoose";

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

export const getStats = async (req: Request, res: Response) => {
  const stats = await Job.aggregate([
    {$match: {createdBy: new mongoose.Types.ObjectId(req.user?.userId)}},
    {$group: {_id: "$jobStatus", count: {$sum: 1}}},
  ]);

  interface Stats {
    [key: string]: number;
  }

  const statsObj = stats.reduce<Stats>((acc, curr) => {
    const {_id: title, count} = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: statsObj.pending || 0,
    interview: statsObj.interview || 0,
    declined: statsObj.declined || 0,
  };

  res.status(StatusCodes.OK).json({defaultStats});
};
