import { Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "services";
import { errorHandlerWrapper } from "utils";

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

/**
 *
 * @param res Response Success message
 *
 * */
export const logOutHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  await userService.logout(token);
  res.status(httpStatus.OK).json({ message: "Successfully logout!" });
};

export const logout = errorHandlerWrapper(logOutHandler);
