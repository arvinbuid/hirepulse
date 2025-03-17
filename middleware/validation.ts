import express from "express";
import mongoose from "mongoose";

import {Request, Response, NextFunction} from "express";
import {body, param, ValidationChain, validationResult} from "express-validator";
import {BadRequestError, NotFoundError, UnauthorizedError} from "../errors/customErrors.ts";
import {JOB_STATUS, JOB_TYPE} from "../utils/constants.ts";

import Job from "../models/JobModel.ts";
import User from "../models/UserModel.ts";

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
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError(errorMessages[0]);
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
  param("id").custom(async (id, {req}) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidMongoId) {
      throw new Error("invalid MongoDB id.");
    }
    const job = await Job.findById(id);

    if (!job) {
      throw new NotFoundError(`No job with id ${id}`);
    }

    const isAdmin = req.user?.role === "admin";
    const isOwner = req.user?.userId === job.createdBy.toString();

    if (!isAdmin && !isOwner) {
      throw new UnauthorizedError("not authorized to access this route.");
    }

    // Store the job in req object
    req.job = job;
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("name is required.")
    .isLength({min: 3})
    .withMessage("name must be at least 3 characters long."),
  body("email")
    .notEmpty()
    .withMessage("email is required.")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({email});
      if (user) {
        throw new BadRequestError("email already exists.");
      }
    })
    .normalizeEmail(),
  body("password").isLength({min: 6}).withMessage("password must be at least 6 characters long."),
  body("lastName").notEmpty().withMessage("last name is required."),
  body("location").notEmpty().withMessage("location is required."),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required.")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("password is required."),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name").isLength({min: 3}).withMessage("name must be at least 3 characters long."),
  body("email")
    .notEmpty()
    .withMessage("email is required.")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, {req}) => {
      const user = await User.findOne({email});
      if (user && user._id.toString() !== req.user?.userId) {
        throw new BadRequestError("email already exists.");
      }
    }),
  body("lastName").isLength({min: 3}).withMessage("last name must be at least 3 characters long."),
]);
