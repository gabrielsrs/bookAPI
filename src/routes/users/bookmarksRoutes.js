import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationBookmark } from "../../middlewares/validation/user/bookmarkValidator.js"
import validationResult from "../../middlewares/validation/validationResult.js"

const route = Router()

route.get("/:id/bookmarks/:bookId?", validateId, validationResult)
route.post("/:id/bookmarks/:bookId", validateId, validateCreationBookmark, validationResult)
route.delete("/:id/bookmarks/:bookmarkId", validateId, validationResult)

export default route
