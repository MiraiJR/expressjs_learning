import { Request, Response } from "express";
import { HttpException } from "../exceptions";
import { StatusCode } from "../constant";

const BEARER_TOKEN_PREFIX = "Bearer ";

export const authentication = (req: Request, res: Response, next: Function) => {
  const authentication = req.headers.authorization;
  let token = "";
  if (authentication && authentication.startsWith(BEARER_TOKEN_PREFIX)) {
    token = authentication.slice(BEARER_TOKEN_PREFIX.length);
  }

  if (token === "abc") {
    req.user = {
      id: 1,
      role: "ADMIN",
    };
    next();
  } else {
    next(
      new HttpException(
        "Unauthorized",
        "AUTHORIZATION_ERROR_0001",
        StatusCode.UNAUTHORIZED
      )
    );
  }
};
