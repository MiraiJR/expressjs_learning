import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

export const validation =
  <T extends ZodObject<any>>(schema: T, target: "body" | "query" | "params") =>
  (req: Request, _: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req[target]);
      req[target] = result;
      next();
    } catch (error) {
      next(error);
    }
  };
