import { Response } from "express";
import httpStatus from "http-status";
import { userService } from "services";
import { errorHandlerWrapper } from "utils/errorHandler.wrapper";
import { AuthRequest } from "types";
import { comparePassword, encryptPassword } from "utils";
import { CustomError } from "errors";
import { MESSAGES } from "consts";

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  password: string;
  resetPasswd: string;
};
type ReqQuery = unknown;

/**
 *
 * @param req Request object containing password and resetPassword in the body
 * @param res Response object to send the updated user
 *
 * */

export const resetPasswordHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { password, resetPasswd } = req.body;
  const { email } = req.user;
  const pwd = await userService.getPassword(email);

  const compare = await comparePassword(password, pwd.password);
  if (!compare) {
    throw new CustomError(
      MESSAGES.OLD_PASSWORD_NOT_CORRECT,
      httpStatus.BAD_REQUEST
    );
  }
  const cryptPassword = await encryptPassword(resetPasswd);
  const user = await userService.resetPassword(email, cryptPassword);

  res.status(httpStatus.OK).json(user);
};

export const resetPassword = errorHandlerWrapper(resetPasswordHandler);
