import { HttpException } from "@/shared/exceptions";
import * as userRepository from "./user.repository";
import { StatusCode } from "@/shared/constant";
import { User } from "@prisma/client";
import { PostCreateUserRequestModel } from "./models/create-user.model";

export const createUser = async (
  data: PostCreateUserRequestModel
): Promise<User | null> => {
  // check existing email
  const isExisted = await userRepository.getUserByEmail(data.email ?? "");

  if (isExisted) {
    throw new HttpException(
      "Email is used!",
      "USER_ERROR_0002",
      StatusCode.BAD_REQUEST
    );
  }

  return userRepository.create(data);
};

export const getSpecifiedUser = async (userId: number): Promise<User> => {
  const matchedUser = await userRepository.getUserById(userId);

  if (!matchedUser) {
    throw new HttpException(
      "User not found",
      "USER_ERROR_0001",
      StatusCode.NOT_FOUND
    );
  }

  return matchedUser;
};
