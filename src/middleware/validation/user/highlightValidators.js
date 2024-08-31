import { body } from "express-validator"

const validateCreationHighlight = [
    body("content")
        .trim()
        .notEmpty()
            .withMessage("Field should not be empty")
        .isString()
            .withMessage("Invalid CONTENT format. Content should be string"),
    body("privacy")
        .optional()
        .isBoolean()
            .withMessage("Invalid PRIVACY format. Privacy should be boolean")
        .toBoolean()
        .toLowerCase(),

    body("book_locale")
        .notEmpty()
            .withMessage("Field should not be empty")
        .isObject()
            .withMessage("Invalid BOOK LOCALE format. Book locale should be a JSON"),

    body(["book_locale.page", "book_locale.paragraph_number", "book_locale.chapter_number", "book_locale.word_offset"])
        .optional()
        .trim()
        .notEmpty()
            .withMessage("Field should not be empty")
        .isInt()
            .withMessage("Invalid FIELDS format. Fields should be integer")
        .toInt(),

    body("book_locale.location_identifier")
        .optional()
        .isObject()
            .withMessage("Invalid LOCATION IDENTIFIER. Location identifier should be a JSON")
        .custom(value => {
            if (Object.keys(value).length === 0) {
                throw new Error('Invalid LOCATION IDENTIFIER. Location identifier JSON should not be empty');
            }

            return true;
        }),

    body('book_locale').custom(value => {
            if (!value) return true
            
            const hasLocationFields =
                'page' in value &&
                'paragraph_number' in value &&
                'chapter_number' in value &&
                'word_offset' in value
            const hasLocationIdentifier = 'location_identifier' in value;

            if (!hasLocationFields && !hasLocationIdentifier) {
                throw new Error("Invalid BOOK LOCALE format. Book locale should contain the (page, paragraph_number, chapter_number, word_offset) or location_identifier fields")
            }

            return true;
        }),
]

const validateUpdateHighlight = [
    body("content")
        .optional()
        .isString()
            .withMessage("Invalid CONTENT format. Content should be string"),
    body("privacy")
        .optional()
        .isBoolean()
            .withMessage("Invalid PRIVACY format. Privacy should be boolean")
        .toBoolean()
        .toLowerCase(),

    body("book_locale")
        .optional()
        .isObject()
            .withMessage("Invalid BOOK LOCALE format. Book locale should be a JSON"),

    body(["book_locale.page", "book_locale.paragraph_number", "book_locale.chapter_number", "book_locale.word_offset"])
        .optional()
        .trim()
        .notEmpty()
            .withMessage("Field should not be empty")
        .isInt()
            .withMessage("Invalid FIELDS format. Fields should be integer")
        .toInt(),

    body("book_locale.location_identifier")
        .optional()
        .isObject()
            .withMessage("Invalid LOCATION IDENTIFIER. Location identifier should be a JSON")
        .custom(value => {
            if (Object.keys(value).length === 0) {
                throw new Error('Invalid LOCATION IDENTIFIER. Location identifier JSON should not be empty')
            }

            return true;
        }),
]

export { validateCreationHighlight, validateUpdateHighlight }