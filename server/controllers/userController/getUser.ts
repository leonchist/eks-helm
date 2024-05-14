import { Response } from "express";
import httpStatus from "http-status";
import { userService } from "services";
import { errorHandlerWrapper } from "utils/errorHandler.wrapper";
import { AuthRequest } from "types";

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

/**
 *
 * @param res Response object to send the login user info
 *
 * */

export const getUserHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { email } = req.user;
  const user = await userService.getUser({ email });
  res.status(httpStatus.OK).json(user);
};

export const getUser = errorHandlerWrapper(getUserHandler);
