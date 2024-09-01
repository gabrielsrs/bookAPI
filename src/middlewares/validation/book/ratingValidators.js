import { body } from "express-validator"

const ratingCreateValidator = [
    body("rating")
        .isInt({ min: 1, max: 5 })
        .withMessage("Invalid RATING format. Rating should be integer and in range 1 to 5"),
    body("privacy")
        .optional()
        .isBoolean()
        .withMessage("Invalid PRIVACY format. Privacy should be boolean (false to public and true to private)")

]

const ratingUpdateValidator = [
    body("rating")
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage("Invalid RATING format. Rating should be integer and in range 1 to 5"),
    body("privacy")
        .optional()
        .isBoolean()
        .withMessage("Invalid PRIVACY format. Privacy should be boolean (false to public and true to private)")

]

export { ratingCreateValidator, ratingUpdateValidator }