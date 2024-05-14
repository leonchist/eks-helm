import { Response } from "express";
import httpStatus from "http-status";
import { todoService } from "services";
import { errorHandlerWrapper } from "utils/errorHandler.wrapper";
import { AuthRequest } from "types";

type Params = {
  id: number;
};
type ResBody = unknown;
type ReqBody = unknown;

type ReqQuery = unknown;

/**
 *
 * @param req Request object containing id in the params
 * @param res Response object to send the deleted id
 *
 * */

export const deleteTodoHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { id } = req.params;

  const result = await todoService.deleteTodo(id);
  res.status(httpStatus.OK).json(result);
};

export const deleteTodo = errorHandlerWrapper(deleteTodoHandler);
