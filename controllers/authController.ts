import {Request, Response, NextFunction} from "express";
import {StatusCodes} from "http-status-codes";

import User from "../models/userModel.ts";
import {comparePassword, hashPassword} from "../utils/passwordUtils.ts";
import {UnauthenticatedError} from "../errors/customErrors.ts";
import {createJWT} from "../utils/tokenUtils.ts";

export const postRegister = async (req: Request, res: Response) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? "admin" : "user";

  // Hash password
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  await User.create(req.body);
  res.status(StatusCodes.CREATED).json({message: "User created."});
};

export const postLogin = async (req: Request, res: Response) => {
  const {email, password} = req.body;

  const user = await User.findOne({email});
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials.");
  }

  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials.");
  }

  // Create token
  const token = createJWT({userId: user._id.toString(), role: user.role});
  console.log(token);

  res.status(StatusCodes.OK).json({message: "User logged in successfully."});
};
