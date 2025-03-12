import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";

import {Request, Response, NextFunction} from "express";

import jobRoutes from "./routes/JobRoutes.ts";

dotenv.config();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/jobs", jobRoutes);

// Not found route
app.use("*", (req, res) => {
  res.status(404).json({message: "Not found."});
});

// Global error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json({message: "Something went wrong."});
});

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL || "");
  app.listen(port, () => console.log(`Server running on port ${port}...`));
} catch (err) {
  console.log(err);
  process.exit(1);
}
