import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import validationResult from "../../middlewares/validation/validationResult.js"

const route = Router()

route.get("/:id/books", validateId, validationResult) 
route.post("/:id/books/:bookId", validateId, validationResult) 
route.delete("/:id/books/:bookId", validateId, validationResult) 

export default route
