import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationUser, validateUpdateUser } from "../../middlewares/validation/user/userValidators.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { UsersControllers } from "../../controllers/users/usersControllers.js"

const route = Router()
const usersControllers = new UsersControllers()

route.get("/:userId?", validateId, validationResult, usersControllers.getUsersController) 
route.post("/", validateCreationUser, validationResult, usersControllers.createUserController) 
route.patch("/:userId", validateId, validateUpdateUser, validationResult, usersControllers.updateUserController) 
route.delete("/:userId", validateId, validationResult, usersControllers.deleteUserController) 

export default route
