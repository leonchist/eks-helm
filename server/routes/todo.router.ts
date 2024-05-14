import express from "express";
import { todoController } from "controllers";
import { todoValidator } from "validators";
import { checkToken } from "utils/auth";

const todoRouter = express.Router();

todoRouter.get("/", todoController.getAllTodo);

todoRouter.post(
  "/",
  checkToken,
  todoValidator.createTodoValidator(),
  todoController.createTodo
);

todoRouter.put(
  "/:id",
  checkToken,
  todoValidator.updateTodoValidator(),
  todoController.updateTodo
);

todoRouter.delete(
  "/:id",
  checkToken,
  todoValidator.deleteTodoValidator(),
  todoController.deleteTodo
);

export default todoRouter;
