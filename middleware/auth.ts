import {Request, Response, NextFunction} from "express";

import {UnauthenticatedError, UnauthorizedError} from "../errors/customErrors.js";
import {verifyJWT} from "../utils/tokenUtils.js";

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const {token} = req.cookies;

  if (!token) {
    throw new UnauthenticatedError("authentication invalid.");
  }

  try {
    const {userId, role} = verifyJWT(token);
    const demo = userId === "67dd3e6e5687f1fbdfb55840";
    req.user = {userId, role, demo};
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

export const checkForDemoUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.demo) throw new UnauthorizedError("Demo User. Read Only!");
  next();
};
