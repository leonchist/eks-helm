import express from "express";
import { authController } from "controllers";
import { authValidator } from "validators";
import { checkToken } from "utils/auth";

const authRouter = express.Router();

// User Log In
authRouter.post("/login", authValidator.logInValidator(), authController.login);

authRouter.post("/logout", checkToken, authController.logout);

export default authRouter;
