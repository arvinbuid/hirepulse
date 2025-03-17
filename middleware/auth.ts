import {Request, Response, NextFunction} from "express";

import {UnauthenticatedError} from "../errors/customErrors.ts";
import {verifyJWT} from "../utils/tokenUtils.ts";

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const {token} = req.cookies;

  if (!token) {
    throw new UnauthenticatedError("authentication invalid.");
  }

  try {
    const {userId, role} = verifyJWT(token);
    req.user = {userId, role};
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid.");
  }
};

export const authorizePermissions = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role!)) {
      throw new UnauthenticatedError("Unauthorized to access this route.");
    }
    next();
  };
};
