import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationBook, validateUpdateBook } from "../../middlewares/validation/book/bookValidators.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { BookControllers } from "../../controllers/books/bookControllers.js"

const route = Router() 

const bookControllers = new BookControllers()

route.get("/:id?", validateId, validationResult, bookControllers.getBookController) 
route.post("/", validateCreationBook, validationResult, bookControllers.createBookController) 
route.patch("/:id", validateId, validateUpdateBook, validationResult, bookControllers.updateBookController) 
route.delete("/:id", validateId, validationResult, bookControllers.deleteBookController) 

export default route
