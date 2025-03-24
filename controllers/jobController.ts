import "express-async-errors";
import {Request, Response, NextFunction} from "express";
import {StatusCodes} from "http-status-codes";

import Job from "../models/JobModel.ts";
import mongoose from "mongoose";
import dayjs from "dayjs";

export const getAllJobs = async (req: Request, res: Response) => {
  const {search} = req.query;

  interface JobQuery {
    createdBy: string | undefined;
    $or?: Array<{
      position: {$regex: string | RegExp; $options: string};
      company: {$regex: string | RegExp; $options: string};
    }>;
  }

  const queryObj: JobQuery = {createdBy: req.user?.userId};

  // Accept query like ?search=a
  if (search) {
    queryObj.$or = [
      {
        position: {$regex: search as string, $options: "i"},
        company: {$regex: search as string, $options: "i"},
      },
    ];
  }

  const jobs = await Job.find(queryObj);

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

  let monthlyApplications = await Job.aggregate([
    {$match: {createdBy: new mongoose.Types.ObjectId(req.user?.userId)}},
    {
      $group: {
        _id: {year: {$year: "$createdAt"}, month: {$month: "$createdAt"}},
        count: {$sum: 1},
      },
    },
    {
      $sort: {"_id.year": -1, "_id.month": -1},
    },
    {
      $limit: 6,
    },
  ]);

  monthlyApplications = monthlyApplications
    .map((i) => {
      const {
        _id: {year, month},
        count,
      } = i;
      // format year & month
      const date = dayjs()
        .month(month - 1)
        .year(year)
        .format("MMM YY");

      return {date, count};
    })
    .reverse();

  res.status(StatusCodes.OK).json({defaultStats, monthlyApplications});
};
