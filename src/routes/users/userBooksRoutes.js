import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { UserBooksControllers } from "../../controllers/users/userBooksControllers.js"

const route = Router()

const userBooksControllers = new UserBooksControllers()

route.get("/:id/books", validateId, validationResult, userBooksControllers.getUserBooksController) 
route.post("/:id/books/:bookId", validateId, validationResult) 
route.delete("/:id/books/:bookId", validateId, validationResult) 

export default route
