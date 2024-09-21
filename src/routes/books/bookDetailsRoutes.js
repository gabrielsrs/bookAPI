import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { BookDetailsControllers } from "../../controllers/books/bookDetailsControllers.js"

const route = Router() 

const bookDetailsControllers = new BookDetailsControllers()

route.get("/:id/notes", validateId, validationResult, bookDetailsControllers.getBookNotesController) 
route.get("/:id/quotes", validateId, validationResult, bookDetailsControllers.getBookQuotesController) 
route.get("/:id/excerpts", validateId, validationResult, bookDetailsControllers.getBookExcerptsController) 
route.get("/:id/bookmark", validateId, validationResult, bookDetailsControllers.getBookBookmarksController) 
route.get("/:id/metadata", validateId, validationResult, bookDetailsControllers.getBookMetadataController) 

export default route