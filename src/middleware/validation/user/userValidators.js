import { body } from "express-validator"

const validateCreationUser = [
    body("nickname")
        .notEmpty()
            .withMessage("Field should not be empty")
        .isString()
            .withMessage("Invalid NICKNAME format. Nickname should be string")
        .isLength({ min: 3 })
            .withMessage("Invalid NICKNAME format. Nickname should have minimum of 3 characters"),
    body("cover_image")
        .optional()
        .isString()
            .withMessage("Invalid COVER IMAGE format. Cover image should be string"),
    body("description")
        .optional()
        .isString()
            .withMessage("Invalid DESCRIPTION format. Description should be string")
]

const validateUpdateUser = [
    body("nickname")
        .optional()
        .isString()
            .withMessage("Invalid NICKNAME format. Nickname should be string")
        .isLength({ min: 3 })
            .withMessage("Invalid NICKNAME format. Nickname should have minimum of 3 characters"),
    body("cover_image")
        .optional()
        .isString()
            .withMessage("Invalid COVER IMAGE format. Cover image should be string"),
    body("description")
        .optional()
        .isString()
            .withMessage("Invalid DESCRIPTION format. Description should be string")
]

export { validateCreationUser, validateUpdateUser }