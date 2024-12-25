import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationList, validateUpdateList } from "../../middlewares/validation/user/listValidators.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { ListsControllers } from "../../controllers/users/listsControllers.js";

const route = Router()

const listsControllers = new ListsControllers()

route.post("/:userId/lists", validateId, validateCreationList, validationResult, listsControllers.createListController) 
route.patch("/:userId/lists/:listId", validateUpdateList, validateId, validationResult, listsControllers.updateListController) 
route.delete("/:userId/lists/:listId", validateId, validationResult, listsControllers.deleteListController) 
route.post("/:userId/lists/:listId/:bookId", validateId, validationResult, listsControllers.addBookToListController) 
route.delete("/:userId/lists/:listId/:bookId", validateId, validationResult, listsControllers.removeBookFromListController) 
route.get("/:userId/lists/like/:listId?", validateId, validationResult, listsControllers.getLikedListsController) 
route.post("/:userId/lists/like/:listId", validateId, validationResult, listsControllers.likeListController) 
route.delete("/:userId/lists/like/:listId", validateId, validationResult, listsControllers.unlikeListController) 
route.get("/:userId/lists/follow/:listId?", validateId, validationResult, listsControllers.getFollowedListsController) 
route.post("/:userId/lists/follow/:listId", validateId, validationResult, listsControllers.followListController) 
route.delete("/:userId/lists/follow/:listId", validateId, validationResult, listsControllers.unfollowListController) 
route.get("/:userId/lists/:listId?", validateId, validationResult, listsControllers.getListsController) 

export default route
