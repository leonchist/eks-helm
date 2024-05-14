import { Response } from "express";
import httpStatus from "http-status";
import { todoService } from "services";
import { errorHandlerWrapper } from "utils/errorHandler.wrapper";
import { AuthRequest } from "types";

type Params = {
  id: number;
};
type ResBody = unknown;
type ReqBody = {
  title: string;
  description: string;
  status: string;
};

type ReqQuery = unknown;

/**
 *
 * @param req Request object containing title, description, status in the body and id in the params
 * @param res Response object to send the updated todo
 *
 * */

export const updateTodoHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { title, description, status } = req.body;
  const { id } = req.params;
  const userId = req.user.id;
  const result = await todoService.updateTodo(
    id,
    title,
    description,
    userId,
    status
  );
  res.status(httpStatus.OK).json(result);
};

export const updateTodo = errorHandlerWrapper(updateTodoHandler);
