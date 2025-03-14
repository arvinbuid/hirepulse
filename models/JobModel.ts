import {Schema, model} from "mongoose";

import {JOB_STATUS, JOB_TYPE} from "../utils/constants.ts";

export interface IJob {
  company: string;
  position: string;
  jobStatus: {};
  jobType: {};
  jobLocation: string;
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
  },
  {
    timestamps: true,
  }
);

const Job = model<IJob>("Job", jobSchema);

export default Job;
