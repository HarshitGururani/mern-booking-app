import { check } from "express-validator";

export const registerValidator = [
  check("email").isEmail().withMessage("Please provide a valid email."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  check("firstName").isString().withMessage("First name is required."),
  check("lastName").isString().withMessage("Last name is required."),
];
