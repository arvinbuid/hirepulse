import mongoose, {Schema, model} from "mongoose";

import {JOB_STATUS, JOB_TYPE} from "../utils/constants.ts";

export interface IJob {
  company: string;
  position: string;
  jobStatus: (typeof JOB_STATUS)[keyof typeof JOB_STATUS];
  jobType: (typeof JOB_TYPE)[keyof typeof JOB_TYPE];
  jobLocation: string;
  createdBy: mongoose.Types.ObjectId;
}

const jobSchema = new Schema<IJob>(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "my city",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Job = model<IJob>("Job", jobSchema);

export default Job;
