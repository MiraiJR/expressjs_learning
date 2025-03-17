import { Request, Response } from "express";

export const authentication = (req: Request, res: Response, next: Function) => {
  console.log("authentication");
  next();
};
