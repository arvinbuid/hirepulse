import {Request, Response, NextFunction} from "express";

export const getLogin = async (req: Request, res: Response) => {
  res.json({message: "Login"});
};

export const getRegister = async (req: Request, res: Response) => {
  res.json({message: "Register"});
};
