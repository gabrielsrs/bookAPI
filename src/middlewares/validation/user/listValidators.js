import { body } from "express-validator"

const validateCreationList = [
    body("name")
        .trim()
        .notEmpty()
            .withMessage("Field should not be empty")
        .isString()
            .withMessage("Invalid TITLE format. Title should be a string"),
    body("description")
        .optional()
        .trim()
        .notEmpty()
            .withMessage("Field should not be empty")
        .isString()
            .withMessage("Invalid TITLE format. Title should be a string"),
    body("privacy")
        .optional()
        .isBoolean()
            .withMessage("Invalid PRIVACY format. Privacy should be boolean")
        .toBoolean()
        .toLowerCase(),
]

const validateUpdateList = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
            .withMessage("Field should not be empty")
        .isString()
            .withMessage("Invalid TITLE format. Title should be a string"),
    body("description")
        .optional()
        .trim()
        .notEmpty()
            .withMessage("Field should not be empty")
        .isString()
            .withMessage("Invalid TITLE format. Title should be a string"),
    body("privacy")
        .optional()
        .isBoolean()
            .withMessage("Invalid PRIVACY format. Privacy should be boolean")
        .toBoolean()
        .toLowerCase(),
]

export { validateCreationList, validateUpdateList }