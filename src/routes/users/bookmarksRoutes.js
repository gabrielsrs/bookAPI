import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationBookmark } from "../../middlewares/validation/user/bookmarkValidator.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { BookmarksControllers } from "../../controllers/users/bookmarksControllers.js";

const route = Router()

const bookmarksControllers = new BookmarksControllers()

route.get("/:userId/bookmarks/:bookId?", validateId, validationResult, bookmarksControllers.getBookmarksController)
route.post("/:userId/bookmarks/:bookId", validateId, validateCreationBookmark, validationResult, bookmarksControllers.createBookmarksController)
route.delete("/:userId/bookmarks/:bookmarkId", validateId, validationResult, bookmarksControllers.deleteBookmarksController)

export default route
