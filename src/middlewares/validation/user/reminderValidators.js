import { body } from "express-validator"

const validateCreationReminder = [
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
            .withMessage("Invalid DESCRIPTION format. Description should be a string"),

    body("reminder_datetime")
        .notEmpty()
            .withMessage("Field should not be empty")
        .isISO8601()
            .withMessage("Invalid REMINDER DATETIME format. Reminder time should be a in ISO8601 eg. 2023-12-28T10:30:00")
        .isAfter({ comparisonDate: new Date().toString() })
            .withMessage("Invalid DATETIME format. Datetime should be greater or equal the current one"),
    body("is_active")   
        .optional()
        .isBoolean()
            .withMessage("Invalid IS ACTIVE format. Is active should be boolean")
        .toBoolean(),
    body("is_sent")
        .optional()
        .isBoolean()
            .withMessage("Invalid IS SENT format. Is sent should be boolean")
        .toBoolean(),
]

const validateUpdateReminder = [
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
            .withMessage("Invalid DESCRIPTION format. Description should be a string"),
    body("reminder_datetime")
        .optional()
        .notEmpty()
            .withMessage("Field should not be empty")
        .isISO8601()
            .withMessage("Invalid REMINDER DATETIME format. Reminder time should be a in ISO8601 eg. 2023-12-28T10:30:00")
        .isAfter({ comparisonDate: new Date().toString() })
            .withMessage("Invalid DATETIME format. Datetime should be greater or equal the current one"),
    body("is_active")
        .optional()
        .isBoolean()
            .withMessage("Invalid IS ACTIVE format. Is active should be boolean")
        .toBoolean()
        .toLowerCase(),
    body("is_sent")
        .optional()
        .isBoolean()
            .withMessage("Invalid IS SENT format. Is sent should be boolean")
        .toBoolean()
        .toLowerCase(),
]

export { validateCreationReminder, validateUpdateReminder }