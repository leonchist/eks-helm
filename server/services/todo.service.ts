import { Like, FindManyOptions } from "typeorm";
import { MESSAGES } from "consts";
import { TodoEntity } from "entities";
import { OrderBy, Status } from "types";
import { Logger, getTodoRepository } from "utils";

export const createTodo = async (
  userId: number,
  title: string,
  description?: string
): Promise<TodoEntity | null> => {
  const todoRepository = await getTodoRepository();
  const todo = new TodoEntity();
  todo.title = title;
  todo.description = description;
  todo.user_id = userId;
  todo.createdBy = userId;
  await todoRepository.save(todo);
  return todo;
};

export const updateTodo = async (
  id: number,
  title: string,
  description: string,
  userId: number,
  status: string
): Promise<TodoEntity | null> => {
  const todoRepository = await getTodoRepository();
  const todo = await todoRepository.findOne({ where: { id: id } });

  if (!todo) {
    Logger.log(MESSAGES.DATA_NOT_EXIST);
    throw new Error(MESSAGES.DATA_NOT_EXIST);
  }

  todo.title = title;
  todo.description = description;
  todo.user_id = userId;
  todo.updatedBy = userId;
  todo.status = status;
  await todoRepository.save(todo);
  return todo;
};

export const getAllTodo = async (
  title?: string,
  status?: Status,
  page?: number,
  limit?: number,
  sortBy?: string,
  orderBy?: OrderBy
): Promise<{ todos: TodoEntity[] | null; totalCount: number }> => {
  const todoRepository = await getTodoRepository();
  const queryOptions: FindManyOptions = {
    where: {
      ...(title ? { title: Like(`%${title}%`) } : {}),
      ...(status ? { status: status } : {}),
    },
    order: {
      [sortBy || "createdAt"]: orderBy || "DESC",
    },
  };

  if (page && limit) {
    queryOptions.skip = (page - 1) * limit;
    queryOptions.take = limit;
  }

  const [todos, totalCount] = await todoRepository.findAndCount(queryOptions);
  return {
    todos,
    totalCount,
  };
};

export const deleteTodo = async (id: number): Promise<Boolean> => {
  const todoRepository = await getTodoRepository();

  const todo = await todoRepository.delete({
    id: id,
  });
  return todo.affected ? true : false;
};
