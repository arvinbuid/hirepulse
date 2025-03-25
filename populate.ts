import {readFile} from "fs/promises";
import {URL} from "url";

import dotenv from "dotenv";
import mongoose from "mongoose";

import User from "./models/UserModel.js";
import Job from "./models/JobModel.js";

dotenv.config();

try {
  await mongoose.connect(process.env.MONGO_URL || "");
  const user = await User.findOne({email: "johndoe@example.io"});
  //   const user = await User.findOne({email: "demouser@example.io"});
  const jsonJobs = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url), {
      encoding: "utf-8",
    })
  );

  const jobs = jsonJobs.map((job: typeof Job) => {
    return {...job, createdBy: user?._id};
  });

  await Job.deleteMany({createdBy: user?._id});
  await Job.create(jobs);
  console.log("Successfully populated database!");
  process.exit(0);
} catch (error) {
  console.error("Error: ", error);
  process.exit(1);
}
