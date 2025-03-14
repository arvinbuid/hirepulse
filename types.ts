import {Request} from "express";
import {IJob} from "./models/JobModel.ts";

declare global {
  namespace Express {
    interface Request {
      job?: IJob;
    }
  }
}
