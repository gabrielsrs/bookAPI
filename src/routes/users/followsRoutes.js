import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { FollowsControllers } from "../../controllers/users/followsControllers.js"

const route = Router()

const followsControllers = new FollowsControllers()

route.get("/:id/following", validateId, validationResult, followsControllers.getFollowingController)
route.get("/:id/follower", validateId, validationResult, followsControllers.getFollowerController)
route.post("/:id/follow/:userId", validateId, validationResult)  
route.delete("/:id/unfollow/:userId", validateId, validationResult)  

export default route
