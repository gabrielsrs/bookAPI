import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationList, validateUpdateList } from "../../middlewares/validation/user/listValidators.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { ListsControllers } from "../../controllers/users/listsControllers.js";

const route = Router()

const listsControllers = new ListsControllers()

route.post("/:id/lists", validateId, validateCreationList, validationResult, listsControllers.createListController) 
route.patch("/:id/lists/:listId", validateUpdateList, validateId, validationResult, listsControllers.updateListController) 
route.delete("/:id/lists/:listId", validateId, validationResult, listsControllers.deleteListController) 
route.post("/:id/lists/:listId/:bookId", validateId, validationResult, listsControllers.addBookToListController) 
route.delete("/:id/lists/:listId/:bookId", validateId, validationResult, listsControllers.removeBookFromListController) 
route.get("/:id/lists/like/:listId?", validateId, validationResult, listsControllers.getLikedListsController) 
route.post("/:id/lists/like/:listId", validateId, validationResult, listsControllers.likeListController) 
route.delete("/:id/lists/like/:listId", validateId, validationResult, listsControllers.unlikeListController) 
route.get("/:id/lists/follow/:listId?", validateId, validationResult, listsControllers.getFollowedListsController) 
route.post("/:id/lists/follow/:listId", validateId, validationResult, listsControllers.followListController) 
route.delete("/:id/lists/follow/:listId", validateId, validationResult, listsControllers.unfollowListController) 
route.get("/:id/lists/:listId?", validateId, validationResult, listsControllers.getListsController) 

export default route
