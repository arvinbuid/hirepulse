import {StatusCodes} from "http-status-codes";
import {Request, Response} from "express";

import User from "../models/UserModel.ts";

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await User.findOne({_id: req.user?.userId}).select("-password");
  res.status(StatusCodes.OK).json({user});
};

export const getApplicationStats = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({message: "application stats."});
};

export const updateUser = async (req: Request, res: Response) => {
  const userObj = {...req.body};
  delete userObj.password; // remove password from user object

  await User.findOneAndUpdate({_id: req.user?.userId}, userObj);
  res.status(StatusCodes.OK).json({message: "User updated successfully."});
};
