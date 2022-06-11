import { body } from "express-validator";
import { validate } from "../../../utility/validation";

export const createTrackValidator = [
    body('name').matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic'),
    validate
]
