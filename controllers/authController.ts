import {Request, Response, NextFunction} from "express";
import {StatusCodes} from "http-status-codes";

import User from "../models/userModel.ts";

export const postRegister = async (req: Request, res: Response) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? "admin" : "user";

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({message: "User created.", user});
};

export const postLogin = async (req: Request, res: Response) => {
  res.json({message: "Login"});
};
