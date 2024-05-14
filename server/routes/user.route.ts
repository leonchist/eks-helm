import express from "express";
import { userController } from "controllers";
import { userValidator } from "validators";
import { checkToken } from "utils/auth";

const userRouter = express.Router();

userRouter.post(
  "/register",
  userValidator.registerValidator(),
  userController.register
);

userRouter.get("/me", checkToken, userController.getUser);
userRouter.put(
  "/reset-password",
  checkToken,
  userValidator.resetPasswordValidator(),
  userController.resetPassword
);

export default userRouter;
