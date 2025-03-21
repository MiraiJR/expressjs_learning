import express from "express";
import * as userController from "./user.controller";
import { asyncHandler, authentication } from "@/shared/middlewares";
import { validation } from "@/shared/middlewares/validation";
import { PostCreateUserRequest } from "./models/create-user.model";

const userRoute = express.Router();

userRoute.post(
  "/",
  authentication,
  validation(PostCreateUserRequest, "body"),
  asyncHandler(userController.createUserHandler)
);

userRoute.get(
  "/:userId",
  authentication,
  asyncHandler(userController.getSpecifiedUserHandler)
);

export default userRoute;
