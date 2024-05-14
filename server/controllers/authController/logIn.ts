import { Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "services";
import { Logger, errorHandlerWrapper } from "utils";
import { CustomError } from "errors";
import { comparePassword } from "utils/password";
import { jwtSign } from "utils/jwt";
import { MESSAGES } from "consts";

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  email: string;
  password: string;
};
type ReqQuery = unknown;
/**
 *
 * @param req Request object containing email and password in the body
 * @param res Response object to send the user object and token
 *
 * */
export const logInHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { email, password } = req.body;

  const user = await userService.getUser({ email });
  Logger.log(user);
  if (!user) {
    throw new CustomError(
      MESSAGES.CREDENTIAL_NOT_CORRECT,
      httpStatus.BAD_REQUEST
    );
  }

  const pwd = await userService.getPassword(email);

  const compare = await comparePassword(password, pwd.password);
  if (!compare) {
    throw new CustomError(
      MESSAGES.CREDENTIAL_NOT_CORRECT,
      httpStatus.BAD_REQUEST
    );
  }
  const token = jwtSign(user);
  res.status(httpStatus.OK).json({ user: user, token: token });
};

export const login = errorHandlerWrapper(logInHandler);
