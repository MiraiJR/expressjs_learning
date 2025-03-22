import { UserRole } from "@prisma/client";

declare module "express" {
  interface Request {
    user?: {
      id: number;
      role: UserRole;
    };
  }
}
