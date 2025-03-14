import {Request, Response, NextFunction} from "express";

import {StatusCodes} from "http-status-codes";
import {NotFoundError} from "../errors/customErrors.ts";

const errorHandlerMiddleware = (
  err: NotFoundError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong, try again later.";
  res.status(statusCode).json({message});
};

export default errorHandlerMiddleware;
