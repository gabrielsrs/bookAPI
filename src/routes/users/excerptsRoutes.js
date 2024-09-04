import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationHighlight, validateUpdateHighlight } from "../../middlewares/validation/user/highlightValidators.js"
import validationResult from "../../middlewares/validation/validationResult.js"

const route = Router()

route.get("/:id/excerpts/:bookId?", validateId, validationResult)
route.post("/:id/excerpts/:bookId", validateId, validateCreationHighlight, validationResult)
route.patch("/:id/excerpts/:excerptId", validateId, validateUpdateHighlight, validationResult)
route.delete("/:id/excerpts/:excerptsId", validateId, validationResult)

export default route
