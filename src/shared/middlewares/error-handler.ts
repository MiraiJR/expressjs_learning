import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions";
import { StatusCode } from "../constant";

export const errorHandler = (
  error: HttpException,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  const status = error.status || StatusCode.INTERNAL_SERVER_ERROR;
  const message = error.message || "Internal Server Error";

  res.status(status).json({
    status,
    message,
    ...(error.code && { code: error.code }),
    stack: error.stack?.split("\n") ?? [],
  });
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
