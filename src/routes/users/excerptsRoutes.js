import { Router } from "express";
import { validateId } from "../../middleware/validation/common/idValidator.js"
import { validateCreationHighlight, validateUpdateHighlight } from "../../middleware/validation/user/highlightValidators.js"
import validationResult from "../../middleware/validation/validationResult.js"

const route = Router()

route.get("/:id/excerpts/:bookId?", validateId, validationResult)
route.post("/:id/excerpts/:bookId", validateId, validateCreationHighlight, validationResult)
route.patch("/:id/excerpts/:excerptId", validateId, validateUpdateHighlight, validationResult)
route.delete("/:id/excerpts/:excerptsId", validateId, validationResult)

export default route
