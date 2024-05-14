import { body, param } from "express-validator";

export const createTodoValidator = () => {
  return [body("title").notEmpty().withMessage({ title: "Title is required" })];
};

export const updateTodoValidator = () => {
  return [
    body("title").notEmpty().withMessage({ title: "Title is required" }),
    param("id")
      .notEmpty()
      .withMessage({ id: "Id of todo should be deleted is required" }),
  ];
};

export const deleteTodoValidator = () => {
  return [
    param("id")
      .notEmpty()
      .withMessage({ id: "Id of todo should be deleted is required" }),
  ];
};
