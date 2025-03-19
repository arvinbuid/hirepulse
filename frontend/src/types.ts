import {USER_ROLE} from "../../utils/constants";
import {JOB_STATUS, JOB_TYPE} from "../../utils/constants";

import mongoose from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
  lastName: string;
  location: string;
  role: (typeof USER_ROLE)[keyof typeof USER_ROLE];
}

export interface Job {
  _id: mongoose.Types.ObjectId;
  company: string;
  position: string;
  jobStatus: (typeof JOB_STATUS)[keyof typeof JOB_STATUS];
  jobType: (typeof JOB_TYPE)[keyof typeof JOB_TYPE];
  jobLocation: string;
  createdAt: Date;
}
