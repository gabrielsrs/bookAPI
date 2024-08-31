import { body } from "express-validator"

const _isbn_10 = /^(?:\d[\ |-]?){9}[\d|X]$/

const _isbn_13 = /^(?:978|979)[\ |-]?(?:\d[\ |-]?){10}$/

const validateCreationBook = [
    body("title")
        .trim()
        .notEmpty()
        .isString()
        .withMessage("Invalid TITLE format. Title should be a string"),
    body("isbn_10")
        .optional()
        .isString()
        .matches(_isbn_10)
        .withMessage("Invalid ISBN_10 format"),
    body("isbn_13")
        .optional()
        .isString()
        .matches(_isbn_13)
        .withMessage("Invalid ISBN_13 format"),
    body("pages")
        .notEmpty()
        .isInt()
        .withMessage("Invalid PAGES format. Pages should to be integer"),
    body("language")
        .trim()
        .notEmpty()
        .isString()
        .withMessage("Invalid LANGUAGE format. Language should be a string"),
    body(["cover_image", "authors.*.cover_image"])
        .optional()
        .trim()
        .isString()
        .withMessage("Invalid COVER IMAGE format. Cover image should be a string"),
    body("publication_date")
        .trim()
        .notEmpty()
        .isString()
        .withMessage("Invalid PUBLICATION DATE format. Publication date should be a string"),
    body("summary")
        .trim()
        .notEmpty()
        .isString()
        .withMessage("Invalid SUMMARY format. Summary should be a string"),
    body(["authors.*.first_name", "authors.*.first_name", "publishers.*.name", "tags.*.name", "categories.*.name"])
        .trim()
        .notEmpty()
        .isString()
        .withMessage("Invalid NAME format. Name should be a string"),
    body("authors.*.bio")
        .optional()
        .isString()
        .withMessage("Invalid BIO format. Bio should be a string"),
    body("publishers.*.address")
        .trim()
        .notEmpty()
        .isString()
        .withMessage("Invalid ADDRESS format. Address should be a string"),
    body("publishers.*.website")
        .optional()
        .isString()
        .withMessage("Invalid WEBSITE format. Name should be a string"),
    body(["tags.*.type", "categories.*.type"])
        .trim()
        .notEmpty()
        .isString()
        .withMessage("Invalid TYPE format. Type should be a string"),
    body("categories.*.description")
        .optional()
        .trim()
        .isString()
        .withMessage("Invalid DESCRIPTION format. Description should be a string"),
]

const validateUpdateBook = [
    body("title")
        .optional()
        .trim()
        .isString()
        .withMessage("Invalid TITLE format. Title should be a string"),
    body("isbn_10")
        .optional()
        .isString()
        .matches(_isbn_10)
        .withMessage("Invalid ISBN_10 format"),
    body("isbn_13")
        .optional()
        .isString()
        .matches(_isbn_13)
        .withMessage("Invalid ISBN_13 format"),
    body("pages")
        .optional()
        .isInt()
        .withMessage("Invalid PAGES format. Pages should to be integer"),
    body("language")
        .optional()
        .trim()
        .isString()
        .withMessage("Invalid LANGUAGE format. Language should be a string"),
    body(["cover_image", "authors.*.cover_image"])
        .optional()
        .trim()
        .isString()
        .withMessage("Invalid COVER IMAGE format. Cover image should be a string"),
    body("publication_date")
        .optional()
        .trim()
        .isString()
        .withMessage("Invalid PUBLICATION DATE format. Publication date should be a string"),
    body("summary")
        .optional()
        .trim()
        .isString()
        .withMessage("Invalid SUMMARY format. Summary should be a string"),
    body(["authors.*.first_name", "authors.*.first_name", "publishers.*.name", "tags.*.name", "categories.*.name"])
        .optional()
        .trim()
        .isString()
        .withMessage("Invalid NAME format. Name should be a string"),
    body("authors.*.bio")
        .optional()
        .isString()
        .withMessage("Invalid BIO format. Bio should be a string"),
    body("publishers.*.address")
        .optional()
        .trim()
        .isString()
        .withMessage("Invalid ADDRESS format. Address should be a string"),
    body("publishers.*.website")
        .optional()
        .isString()
        .withMessage("Invalid WEBSITE format. Name should be a string"),
    body(["tags.*.type", "categories.*.type"])
        .optional()
        .trim()
        .isString()
        .withMessage("Invalid TYPE format. Type should be a string"),
    body("categories.*.description")
        .optional()
        .trim()
        .isString()
        .withMessage("Invalid DESCRIPTION format. Description should be a string"),
]

export { validateCreationBook, validateUpdateBook }