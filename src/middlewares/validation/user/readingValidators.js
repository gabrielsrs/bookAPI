import { body } from "express-validator"

const validateProgress = [
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

const validateCreationGoal = [
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
    body("time")
        .trim()
        .notEmpty()
            .withMessage("Field should not be empty")
        .isTime()
            .withMessage("Invalid TIME format. Time should be a in hours"),
    body("end_date")
        .optional()
        .trim()
        .notEmpty()
            .withMessage("Field should not be empty")
        .isDate({ format: 'MM/DD/YYYY' })
            .withMessage("Invalid DATE format. Date should be a date('MM/DD/YYYY')")
        .isAfter({ comparisonDate: new Date().toISOString() })
            .withMessage("Invalid DATE format. Date should be greater than the current one"),
    body("frequency")
        .notEmpty()
            .withMessage("Field should not be empty")
        .isObject()
            .withMessage("Invalid FREQUENCY format. Frequency should be a JSON"),
    body("frequency.option")
        .notEmpty()
            .withMessage("Field should not be empty")
        .isString()
            .withMessage("Invalid FREQUENCY format. Frequency should be a string"),
    body("frequency.marker")
        .optional()
        .notEmpty()
            .withMessage("Field(s) should not be empty")
        .isArray()
            .withMessage("Invalid MARKER format. Marker should be a array") 
]

const validateUpdateGoal = [
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
    body("time")
        .optional()
        .trim()
        .notEmpty()
            .withMessage("Field should not be empty")
        .isTime()
            .withMessage("Invalid TIME format. Time should be a in hours"),
    body("end_date")
        .optional()
        .trim()
        .notEmpty()
            .withMessage("Field should not be empty")
        .isDate({ format: 'MM/DD/YYYY' })
            .withMessage("Invalid DATE format. Date should be a date('MM/DD/YYYY')")
        .isAfter({ comparisonDate: new Date().toISOString() })
            .withMessage("Invalid DATE format. Date should be greater than the current one"),
    body("frequency")
        .optional()
        .notEmpty()
            .withMessage("Field should not be empty")
        .isObject()
            .withMessage("Invalid FREQUENCY format. Frequency should be a JSON"),
    body("frequency.option")
        .optional()
        .trim()
        .notEmpty()
            .withMessage("Field should not be empty")
        .isString()
            .withMessage("Invalid FREQUENCY format. Frequency should be a string"),
    body("frequency.marker")
        .optional()
        .trim()
        .notEmpty()
            .withMessage("Field(s) should not be empty")
        .isArray()
            .withMessage("Invalid MARKER format. Marker should be a array") 
]

export { validateProgress, validateCreationGoal, validateUpdateGoal }