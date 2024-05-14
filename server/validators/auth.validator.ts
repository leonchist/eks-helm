import { body } from "express-validator";

export const logInValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage({ email: "Email is required" })
      .bail()
      .isEmail()
      .withMessage({ email: "Email is incorrect" }),
    body("password")
      .notEmpty()
      .withMessage({ password: "Password is required." }),
  ];
};
