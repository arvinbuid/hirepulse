import {Schema, model} from "mongoose";

interface IJob {
  company: string;
  position: string;
  jobStatus: "interview" | "declined" | "pending";
  jobType: "full-time" | "part-time" | "internship";
  jobLocation: string;
}

const jobSchema = new Schema<IJob>(
  {
    company: {
      type: String,
      required: [true, "Company name is required."],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
    },
    jobStatus: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
      default: "full-time",
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
