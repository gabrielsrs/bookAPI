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
    body("reminder_time")
        .trim()
        .notEmpty()
            .withMessage("Field should not be empty")
        .isTime()
            .withMessage("Invalid REMINDER TIME format. Reminder time should be a in hours"),
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
    body("reminder_time")
        .optional()
        .trim()
        .notEmpty()
            .withMessage("Field should not be empty")
        .isTime()
            .withMessage("Invalid REMINDER TIME format. Reminder time should be a in hours"),
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