import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import validationResult from "../../middlewares/validation/validationResult.js"

const route = Router() 

route.get("/:id/notes", validateId, validationResult) 
route.get("/:id/quotes", validateId, validationResult) 
route.get("/:id/excerpts", validateId, validationResult) 
route.get("/:id/bookmark", validateId, validationResult) 
route.get("/:id/metadata", validateId, validationResult) 

export default route