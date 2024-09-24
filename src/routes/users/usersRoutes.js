import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationUser, validateUpdateUser } from "../../middlewares/validation/user/userValidators.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { UsersControllers } from "../../controllers/users/usersControllers.js"

const route = Router()
const usersControllers = new UsersControllers()

route.get("/:id?", validateId, validationResult, usersControllers.getUsersController) 
route.post("/", validateCreationUser, validationResult) 
route.patch("/:id", validateId, validateUpdateUser, validationResult) 
route.delete("/:id", validateId, validationResult) 

export default route
