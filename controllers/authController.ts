import {Request, Response, NextFunction} from "express";

import User from "../models/userModel.ts";

export const postRegister = async (req: Request, res: Response) => {
  const user = await User.create(req.body);

  res.json({message: "User created.", user});
};

export const postLogin = async (req: Request, res: Response) => {
  res.json({message: "Login"});
};
