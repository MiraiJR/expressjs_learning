import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

export const validation =
  <T extends ZodObject<any>>(
    schema: T,
    target: "body" | "query" | "params" | ("body" | "query" | "params")[]
  ) =>
  (req: Request, _: Response, next: NextFunction) => {
    try {
      if (Array.isArray(target)) {
        target.forEach((key) => schema.parse(req[key]));
      } else {
        schema.parse(req[target]);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
