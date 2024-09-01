import { param } from "express-validator"

const validateId = [
    param([
        "id", 
        "userId", 
        "ratingId", 
        "bookId", 
        "noteId", 
        "quotesId", 
        "excerptId", 
        "bookmarkId", 
        "listId", 
        "progressId", 
        "goalId",
        "reminderId"
    ])
        .optional()
        .isULID()
            .withMessage("Invalid ULID format")
]


export { validateId }