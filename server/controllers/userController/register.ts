import { Request, Response } from "express";
import httpStatus from "http-status";

import { MESSAGES } from "consts";
import { userService } from "services";
import { ArgumentValidationError } from "errors";
import { errorHandlerWrapper } from "utils/errorHandler.wrapper";
import { Logger, encryptPassword } from "utils";

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  email: string;
  name: string;
  password: string;
};
type ReqQuery = unknown;

/**
 *
 * @param req Request object containing email, name and password in the body
 * @param res Response object to send the new user
 *
 * */

export const registerHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { email, name, password } = req.body;
  const user = await userService.getUser({ email });
  Logger.log(user);
  if (user) {
    throw new ArgumentValidationError(
      `${email} is already registered. Please sign in or change another email address`,
      [
        {
          email: `${email} is already registered. Please sign in or change another email address`,
        },
      ],
      MESSAGES.DUPLICATED_ACCOUNT
    );
  }

  const cryptPassword = await encryptPassword(password);
  const result = await userService.createUser(name, email, cryptPassword);
  res.status(httpStatus.OK).json(result);
};

export const register = errorHandlerWrapper(registerHandler);
