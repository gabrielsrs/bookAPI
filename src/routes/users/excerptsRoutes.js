import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationHighlight, validateUpdateHighlight } from "../../middlewares/validation/user/highlightValidators.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { ExcerptsControllers } from "../../controllers/users/excerptsControllers.js";

const route = Router()

const excerptsControllers = new ExcerptsControllers()

route.get("/:userId/excerpts/:bookId?", validateId, validationResult, excerptsControllers.getExcerptsController)
route.post("/:userId/excerpts/:bookId", validateId, validateCreationHighlight, validationResult, excerptsControllers.createExcerptsController)
route.patch("/:userId/excerpts/:excerptId", validateId, validateUpdateHighlight, validationResult, excerptsControllers.updateExcerptsController)
route.delete("/:userId/excerpts/:excerptId", validateId, validationResult, excerptsControllers.deleteExcerptsController)

export default route
