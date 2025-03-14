import express from "express";
import mongoose from "mongoose";

import {Request, Response, NextFunction} from "express";
import {body, param, ValidationChain, validationResult} from "express-validator";
import {BadRequestError, NotFoundError} from "../errors/customErrors.ts";
import {JOB_STATUS, JOB_TYPE} from "../utils/constants.ts";

import Job from "../models/JobModel.ts";

const withValidationErrors = (validateValues: ValidationChain[]) => {
  return [
    ...validateValues,
    ((req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages[0]);
        }
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
  param("id").custom(async (id) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidMongoId) {
      throw new Error("invalid MongoDB id.");
    }
    const job = await Job.findById(id);

    if (!job) {
      throw new NotFoundError(`No job with id ${id}`);
    }
  }),
]);
