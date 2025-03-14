import express from "express";

import {Request, Response, NextFunction} from "express";
import {ValidationChain, validationResult} from "express-validator";
import {BadRequestError} from "../errors/customErrors.ts";

const withValidationErrors = (validateValues: ValidationChain[]) => {
  return [
    ...validateValues,
    ((req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages.join(", "));
      }
      next();
    }) as express.RequestHandler,
  ];
};
