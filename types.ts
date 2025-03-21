import mongoose from "mongoose";
import {IJob} from "./models/JobModel.ts";

declare global {
  namespace Express {
    interface Request {
      job?: IJob;
      user?: {
        userId: string;
        role: string;
        demo: boolean;
      };
    }
  }
}
