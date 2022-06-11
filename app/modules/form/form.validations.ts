import { body } from "express-validator";
import { validate } from "../../../utility/validation";


export const createFormValidator = [
    body('feedbackTo').isString().withMessage("feedback To is required"),
    body('track').isString().withMessage("track is required"),
    body('ratings.*.logic').
        isFloat({ min: 0, max: 10 }).
        withMessage("ratings is Invalid"),
    body('ratings.*.communication').
        isFloat({ min: 0, max: 10 }).
        withMessage("ratings is Invalid"),
    body('ratings.*.assignment').
        isFloat({ min: 0, max: 10 }).
        withMessage("ratings is Invalid"),
    body('ratings.*.proactiveness').
        isFloat({ min: 0, max: 10 }).
        withMessage("ratings is Invalid"),
    validate
]


export const updateFormValidator = [
    body('ratings.*.logic').
        isFloat({ min: 0, max: 10 }).
        withMessage("Logic ratings is Invalid"),
    body('ratings.*.communication').
        isFloat({ min: 0, max: 10 }).
        withMessage("Communication ratings is Invalid"),
    body('ratings.*.assignment').
        isFloat({ min: 0, max: 10 }).
        withMessage("Assignment ratings is Invalid"),
    body('ratings.*.proactiveness').
        isFloat({ min: 0, max: 10 }).
        withMessage("Proactiveness ratings is Invalid"),
    validate
]