import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationHighlight, validateUpdateHighlight } from "../../middlewares/validation/user/highlightValidators.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { ExcerptsControllers } from "../../controllers/users/excerptsControllers.js";

const route = Router()

const excerptsControllers = new ExcerptsControllers()

route.get("/:id/excerpts/:bookId?", validateId, validationResult, excerptsControllers.getExcerptsController)
route.post("/:id/excerpts/:bookId", validateId, validateCreationHighlight, validationResult)
route.patch("/:id/excerpts/:excerptId", validateId, validateUpdateHighlight, validationResult)
route.delete("/:id/excerpts/:excerptsId", validateId, validationResult)

export default route
