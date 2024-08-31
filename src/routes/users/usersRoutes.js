import { Router } from "express";
import { validateId } from "../../middleware/validation/common/idValidator.js"
import { validateCreationUser, validateUpdateUser } from "../../middleware/validation/user/userValidators.js"
import validationResult from "../../middleware/validation/validationResult.js"

const route = Router()

route.get("/:id?", validateId, validationResult) 
route.post("/", validateCreationUser, validationResult) 
route.patch("/:id", validateId, validateUpdateUser, validationResult) 
route.delete("/:id", validateId, validationResult) 

export default route
