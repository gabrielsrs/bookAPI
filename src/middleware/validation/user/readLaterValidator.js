import { body } from "express-validator"

const validateCreationReadingLater = [
    body("privacy")
        .optional()
        .isBoolean()
            .withMessage("Invalid PRIVACY IMAGE format. Privacy should be boolean")
        .toBoolean()
        .toLowerCase(),
]

export { validateCreationReadingLater }