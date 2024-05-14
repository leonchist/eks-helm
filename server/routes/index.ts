import express from "express";

import userRouter from "./user.route";
import authRouter from "./auth.router";
const appRoutes = express.Router();

appRoutes.use("/users", userRouter);
appRoutes.use("/auth", authRouter);
export default appRoutes;
