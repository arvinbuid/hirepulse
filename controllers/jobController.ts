import "express-async-errors";
import {Request, Response, NextFunction} from "express";
import {StatusCodes} from "http-status-codes";

import Job from "../models/JobModel.js";
import mongoose from "mongoose";
import dayjs from "dayjs";

export const getAllJobs = async (req: Request, res: Response) => {
  const {search, jobStatus, jobType, sort} = req.query;

  interface JobQuery {
    createdBy: string | undefined;
    jobStatus?: string;
    jobType?: string;
    sort?: string;
    $or?: Array<{
      position: {$regex: string | RegExp; $options: string};
      company: {$regex: string | RegExp; $options: string};
    }>;
  }

  // QUERY
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

  // Add jobStatus to query if condition is true
  if (jobStatus && jobStatus !== "all") {
    queryObj.jobStatus = jobStatus as string;
  }

  // Add jobType to query if condition is true
  if (jobType && jobType !== "all") {
    queryObj.jobType = jobType as string;
  }

  // SORTING
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  // Define the type for valid sort keys
  type SortKey = keyof typeof sortOptions; // = "newest" | "oldest" | "a-z" | "z-a"

  // Check if provided sort parameter is a valid key
  const sortKey = Object.keys(sortOptions).includes(sort as string)
    ? sortOptions[sort as SortKey]
    : sortOptions.newest;

  // PAGINATION
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObj).sort(sortKey).limit(limit).skip(skip);

  const totalJobs = await Job.countDocuments(queryObj);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({totalJobs, numOfPages, currentPage: page, jobs});
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
