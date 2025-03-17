import { HttpException } from "@/shared/exceptions";
import * as userRepository from "./user-repository";
import { StatusCode } from "@/shared/constant";
import { ICreateUser } from "./model";

export const handleCreateUser = async (data: ICreateUser) => {
  // check existing email
  const isExisted = await userRepository.getUserByEmail(data.email);

  if (isExisted) {
    throw new HttpException(
      "Email is used!",
      "USER_ERROR_0002",
      StatusCode.BAD_REQUEST
    );
  }

  // create user
  return userRepository.create(data);
};
