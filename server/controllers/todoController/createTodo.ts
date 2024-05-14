import { Response } from "express";
import httpStatus from "http-status";
import { todoService } from "services";
import { errorHandlerWrapper } from "utils/errorHandler.wrapper";
import { AuthRequest } from "types";

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  title: string;
  description?: string;
};

type ReqQuery = unknown;
/**
 *
 * @param req Request object containing title and description in the body
 * @param res Response object to send the new todo
 *
 * */
export const createTodoHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { title, description } = req.body;
  const userId = req.user.id;
  const result = await todoService.createTodo(userId, title, description);
  res.status(httpStatus.OK).json(result);
};

export const createTodo = errorHandlerWrapper(createTodoHandler);
