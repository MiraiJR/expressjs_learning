import { prisma } from "@/shared/database";
import { User } from "@prisma/client";
import { ICreateUser } from "./model";

export const getUserById = (id: number): Promise<User | null> => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const create = (user: ICreateUser): Promise<User | null> => {
  return prisma.user.create({
    data: {
      ...user,
    },
  });
};

export const getUserByEmail = (email: string): Promise<User | null> => {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
};
