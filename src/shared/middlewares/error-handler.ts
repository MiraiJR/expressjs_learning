import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions";
import { StatusCode } from "../constant";
import { ZodError } from "zod";

export const errorHandler = (
  error: HttpException,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (error instanceof ZodError) {
    handleZodValidationError(error, res);
    return;
  }

  const status = error.status || StatusCode.INTERNAL_SERVER_ERROR;
  const message = error.message || "Internal Server Error";

  res.status(status).json({
    status,
    message,
    ...(error.code && { code: error.code }),
    stack: error.stack?.split("\n") ?? [],
  });
};

const handleZodValidationError = (error: ZodError, res: Response) => {
  const validationErrors = error.errors.map((errorValidation) => ({
    field: errorValidation.path[0],
    message: errorValidation.message,
  }));

  res.status(StatusCode.BAD_REQUEST).json({
    status: StatusCode.BAD_REQUEST,
    message: "Validation error",
    code: "VALIDATION_ERROR",
    validationErrors: validationErrors,
    stack: error.stack?.split("\n") ?? [],
  });
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
