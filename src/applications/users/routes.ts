import { StatusCode } from "@/shared/constant";
import express, { Request, Response } from "express";
import { createUser, getSpecifiedUser } from "./user-controller";
import { asyncHandler, authentication } from "@/shared/middlewares";

const userRoute = express.Router();

userRoute.get("/", (_: Request, res: Response) => {
  res.status(StatusCode.SUCCESS).json([]);
});
userRoute.post("/", authentication, asyncHandler(createUser));
userRoute.get("/:userId", authentication, asyncHandler(getSpecifiedUser));

export default userRoute;
