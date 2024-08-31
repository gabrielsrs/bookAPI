import { Router } from "express";
import { validateId } from "../../middleware/validation/common/idValidator.js"
import validationResult from "../../middleware/validation/validationResult.js"

const route = Router()

route.get("/:id/books", validateId, validationResult) 
route.post("/:id/books/:bookId", validateId, validationResult) 
route.delete("/:id/books/:bookId", validateId, validationResult) 

export default route
