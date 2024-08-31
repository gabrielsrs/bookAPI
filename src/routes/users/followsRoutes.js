import { Router } from "express";
import { validateId } from "../../middleware/validation/common/idValidator.js"
import validationResult from "../../middleware/validation/validationResult.js"

const route = Router()

route.get("/:id/follows", validateId, validationResult)  
route.post("/:id/follow/:userId", validateId, validationResult)  
route.delete("/:id/unfollow/:userId", validateId, validationResult)  

export default route
