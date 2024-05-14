import { body } from "express-validator";

export const registerValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage({ email: "Email is required" })
      .bail()
      .isEmail()
      .withMessage({ email: "Email is incorrect" }),
    body("name").notEmpty().withMessage({ name: "Name is required" }),
    body("password")
      .notEmpty()
      .withMessage({ password: "Password is required" }),
  ];
};

export const resetPasswordValidator = () => {
  return [
    body("resetPasswd")
      .notEmpty()
      .withMessage({ resetPasswd: "Reset Password is required" }),
  ];
};
