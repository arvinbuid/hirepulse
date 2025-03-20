import dotenv from "dotenv";
import "./types";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import {v2 as cloudinary} from "cloudinary";

import jobRoutes from "./routes/JobRoutes.ts";
import authRoutes from "./routes/authRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";

// Middlewares
import errorHandlerMiddleware from "./middleware/errorHandler.ts";
import {authenticateUser} from "./middleware/auth.ts";
import cookieParser from "cookie-parser";

// Public
import path, {dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/jobs", authenticateUser, jobRoutes);
app.use("/api/v1/users", authenticateUser, userRoutes);
app.use("/api/v1/auth", authRoutes);

// Not found route
app.use("*", (req, res) => {
  res.status(404).json({message: "Not found."});
});

// Global error handler middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL || "");
  app.listen(port, () => console.log(`Server running on port ${port}...`));
} catch (err) {
  console.log(err);
  process.exit(1);
}
