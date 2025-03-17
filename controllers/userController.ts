import {StatusCodes} from "http-status-codes";
import {Request, Response} from "express";

export const getCurrentUser = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({message: "get current user."});
};

export const getApplicationStats = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({message: "application stats."});
};

export const updateUser = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({message: "update user."});
};
