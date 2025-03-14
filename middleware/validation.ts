import express from "express";
import mongoose from "mongoose";

import {Request, Response, NextFunction} from "express";
import {body, param, ValidationChain, validationResult} from "express-validator";
import {BadRequestError} from "../errors/customErrors.ts";
import {JOB_STATUS, JOB_TYPE} from "../utils/constants.ts";

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

export const validateJobInput = withValidationErrors([
  body("company")
    .notEmpty()
    .withMessage("company is required.")
    .isLength({min: 3, max: 50})
    .withMessage("company must be at least 3 and at most 50 characters."),
  body("position").notEmpty().withMessage("position is required."),
  body("jobLocation").notEmpty().withMessage("job location is required."),
  body("jobStatus").isIn(Object.values(JOB_STATUS)).withMessage("invalid job status."),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("invalid job type."),
]);

export const validateParamId = withValidationErrors([
  param("id")
    .custom((id) => mongoose.Types.ObjectId.isValid(id))
    .withMessage("invalid MongoDB id."),
]);
