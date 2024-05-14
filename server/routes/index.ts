import express from "express";

import userRouter from "./user.route";
import authRouter from "./auth.router";
import todoRouter from "./todo.router";

const appRoutes = express.Router();

appRoutes.use("/users", userRouter);
appRoutes.use("/auth", authRouter);
appRoutes.use("/todos", todoRouter);

export default appRoutes;
