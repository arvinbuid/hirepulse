import {StatusCodes} from "http-status-codes";
import {Request, Response} from "express";
import {v2 as cloudinary} from "cloudinary";
import {promises as fs} from "fs";

import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await User.findOne({_id: req.user?.userId}).select("-password");
  res.status(StatusCodes.OK).json({user});
};

export const getApplicationStats = async (req: Request, res: Response) => {
  const userCount = await User.countDocuments();
  const jobCount = await Job.countDocuments();
  res.status(StatusCodes.OK).json({userCount, jobCount});
};

export const updateUser = async (req: Request, res: Response) => {
  const newUser = {...req.body};
  delete newUser.password; // remove password from user object

  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path);
    await fs.unlink(req.file.path); // remove old image
    newUser.avatar = response.secure_url + "?timestamp=" + Date.now();
    newUser.avatarPublicId = response.public_id;
  }

  const oldUser = await User.findOneAndUpdate({_id: req.user?.userId}, newUser);

  // If there is new file and there is existing image,
  // delete existing image
  if (req.file && oldUser!.avatarPublicId) {
    await cloudinary.uploader.destroy(oldUser!.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({message: "User updated successfully."});
};
