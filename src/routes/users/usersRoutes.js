import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationUser, validateUpdateUser } from "../../middlewares/validation/user/userValidators.js"
import validationResult from "../../middlewares/validation/validationResult.js"

const route = Router()

route.get("/:id?", validateId, validationResult) 
route.post("/", validateCreationUser, validationResult) 
route.patch("/:id", validateId, validateUpdateUser, validationResult) 
route.delete("/:id", validateId, validationResult) 

export default route
