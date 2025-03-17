import { Request, Response } from "express";
import { StatusCode } from "@/shared/constant";
import { HttpException } from "@/shared/exceptions";
import * as userService from "@/applications/users/user-service";

export const getSpecifiedUserHandler = async (req: Request, res: Response) => {
  // validate params

  const { userId = "" } = req.params;

  const matchedUser = await userService.getSpecifiedUser(
    parseInt(userId, 10) ?? 0
  );

  res.status(StatusCode.SUCCESS).json(matchedUser);
};

export const createUserHandler = async (req: Request, res: Response) => {
  // validate body

  const createdUser = await userService.createUser(req.body);

  res.status(StatusCode.CREATED).json(createdUser);
};
