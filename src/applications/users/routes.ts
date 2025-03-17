import express from "express";
import * as userController from "./user-controller";
import { asyncHandler, authentication } from "@/shared/middlewares";

const userRoute = express.Router();

userRoute.post(
  "/",
  authentication,
  asyncHandler(userController.createUserHandler)
);

userRoute.get(
  "/:userId",
  authentication,
  asyncHandler(userController.getSpecifiedUserHandler)
);

export default userRoute;
