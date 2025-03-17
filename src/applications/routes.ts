import express from "express";
import userRoute from "./users/routes";

const apiRoute = express.Router();

apiRoute.use("/api/v1/users", userRoute);

export default apiRoute;
