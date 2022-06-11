import { body } from "express-validator";
import { validate } from "../../../utility/validation";

export const createUserValidator = [
    body('name').matches(/^[A-Za-z\s]+$/).withMessage("name is required / must be alphabetic"),
    validate
]

export const loginValidator = [
    body('userID').isString().withMessage("User id is required"),
    body('password').isString().withMessage("password is required"),
    validate
]

export const updateUserValidator = [
    body('name').matches(/^[A-Za-z\s]+$/).withMessage("name is required / must be alphabetic"),
    body('email').isEmail().withMessage("Email is required"),
    body('role').isString().withMessage("role is required"),
    validate
]