import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { BookDetailsControllers } from "../../controllers/books/bookDetailsControllers.js"

const route = Router() 

const bookDetailsControllers = new BookDetailsControllers()

route.get("/:bookId/notes", validateId, validationResult, bookDetailsControllers.getBookNotesController) 
route.get("/:bookId/quotes", validateId, validationResult, bookDetailsControllers.getBookQuotesController) 
route.get("/:bookId/excerpts", validateId, validationResult, bookDetailsControllers.getBookExcerptsController) 
route.get("/:bookId/bookmark", validateId, validationResult, bookDetailsControllers.getBookBookmarksController) 
route.get("/:bookId/metadata", validateId, validationResult, bookDetailsControllers.getBookMetadataController) 

export default route