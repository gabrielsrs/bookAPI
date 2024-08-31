import { Router } from "express";
import { validateId } from "../../middleware/validation/common/idValidator.js"
import { validateCreationList, validateUpdateList } from "../../middleware/validation/user/listValidators.js"
import validationResult from "../../middleware/validation/validationResult.js"

const route = Router()

route.get("/:id/lists/:listId?", validateId, validationResult) 
route.post("/:id/lists", validateId, validateCreationList, validationResult) 
route.patch("/:id/lists/:listId", validateUpdateList, validateId, validationResult) 
route.delete("/:id/lists/:listId", validateId, validationResult) 
route.post("/:id/lists/:listId/:bookId", validateId, validationResult) 
route.delete("/:id/lists/:listId/:bookId", validateId, validationResult) 
route.get("/:id/lists/like", validateId, validationResult) 
route.post("/:id/lists/like/:listId", validateId, validationResult) 
route.delete("/:id/lists/like/:listId", validateId, validationResult) 
route.get("/:id/lists/follow", validateId, validationResult) 
route.post("/:id/lists/follow/:listId", validateId, validationResult) 
route.delete("/:id/lists/follow/:listId", validateId, validationResult) 

export default route
