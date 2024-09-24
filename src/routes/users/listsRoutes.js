import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationList, validateUpdateList } from "../../middlewares/validation/user/listValidators.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { ListsControllers } from "../../controllers/users/listsControllers.js";

const route = Router()

const listsControllers = new ListsControllers()

route.post("/:id/lists", validateId, validateCreationList, validationResult) 
route.patch("/:id/lists/:listId", validateUpdateList, validateId, validationResult) 
route.delete("/:id/lists/:listId", validateId, validationResult) 
route.post("/:id/lists/:listId/:bookId", validateId, validationResult) 
route.delete("/:id/lists/:listId/:bookId", validateId, validationResult) 
route.get("/:id/lists/like/:listId?", validateId, validationResult, listsControllers.getLikedListsController) 
route.post("/:id/lists/like/:listId", validateId, validationResult) 
route.delete("/:id/lists/like/:listId", validateId, validationResult) 
route.get("/:id/lists/follow/:listId?", validateId, validationResult, listsControllers.getFollowedListsController) 
route.post("/:id/lists/follow/:listId", validateId, validationResult) 
route.delete("/:id/lists/follow/:listId", validateId, validationResult) 
route.get("/:id/lists/:listId?", validateId, validationResult, listsControllers.getListsController) 

export default route
