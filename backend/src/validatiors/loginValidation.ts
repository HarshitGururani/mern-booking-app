import { check } from "express-validator";

export const loginValidation = [
  check("email").isEmail().withMessage("Please provide a valid email."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];
