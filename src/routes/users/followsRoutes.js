import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { FollowsControllers } from "../../controllers/users/followsControllers.js"

const route = Router()

const followsControllers = new FollowsControllers()

route.get("/:userId/follows", validateId, validationResult, followsControllers.getFollowsController)
route.post("/:userId/follows/:userId", validateId, validationResult, followsControllers.createFollowController)  
route.delete("/:userId/follows/:userId", validateId, validationResult, followsControllers.deleteFollowController)  

export default route
