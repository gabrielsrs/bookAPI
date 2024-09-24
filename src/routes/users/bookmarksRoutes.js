import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationBookmark } from "../../middlewares/validation/user/bookmarkValidator.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { BookmarksControllers } from "../../controllers/users/bookmarksControllers.js";

const route = Router()

const bookmarksControllers = new BookmarksControllers()

route.get("/:id/bookmarks/:bookId?", validateId, validationResult, bookmarksControllers.getBookmarksController)
route.post("/:id/bookmarks/:bookId", validateId, validateCreationBookmark, validationResult)
route.delete("/:id/bookmarks/:bookmarkId", validateId, validationResult)

export default route
