import { Request, Response } from "express";
import { getUserById } from "./user-repository";
import { StatusCode } from "@/shared/constant";
import { HttpException } from "@/shared/exceptions";
import * as userService from "@/applications/users/user-service";

export const getSpecifiedUser = async (req: Request, res: Response) => {
  const { userId = "" } = req.params;

  const matchedUser = await getUserById(parseInt(userId, 10) ?? 0);

  if (!matchedUser) {
    throw new HttpException(
      "User not found",
      "USER_ERROR_0001",
      StatusCode.NOT_FOUND
    );
  }

  res.status(StatusCode.SUCCESS).json(matchedUser);
};

export const createUser = async (req: Request, res: Response) => {
  const createdUser = await userService.handleCreateUser(req.body);

  res.status(StatusCode.CREATED).json(createdUser);
};
