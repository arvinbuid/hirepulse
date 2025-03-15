import {NextFunction, Request, Response} from "express";
import {UnauthenticatedError} from "../errors/customErrors.ts";

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const {token} = req.cookies;

  if (!token) {
    throw new UnauthenticatedError("authentication invalid.");
  }
  next();
};
