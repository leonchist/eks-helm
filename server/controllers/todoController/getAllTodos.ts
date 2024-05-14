import { Request, Response } from "express";
import httpStatus from "http-status";
import { todoService } from "services";
import { errorHandlerWrapper } from "utils/errorHandler.wrapper";
import { OrderBy, Status } from "types";

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = {
  title?: string;
  status?: Status;
  page?: number;
  limit?: number;
  sortBy?: string;
  orderBy?: OrderBy;
};

/**
 *
 * @param req Request object containing title, status, page, limit, sortBy, orderBy in the query
 * @param res Response object to send the all todo list and count
 *
 * */

export const getAllTodoHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { title, status, page, limit, orderBy, sortBy } = req.query;

  const { todos, totalCount } = await todoService.getAllTodo(
    title,
    status,
    page,
    limit,
    sortBy,
    orderBy
  );

  res.status(httpStatus.OK).json({ todos, totalCount });
};

export const getAllTodo = errorHandlerWrapper(getAllTodoHandler);
