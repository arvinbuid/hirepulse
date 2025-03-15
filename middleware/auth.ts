import {NextFunction, Request, Response} from "express";

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  console.log("auth middleware");
  next();
};
