import { Router } from "express";
import { validateId } from "../../middleware/validation/common/idValidator.js"
import { validateCreationHighlight, validateUpdateHighlight } from "../../middleware/validation/user/highlightValidators.js"
import validationResult from "../../middleware/validation/validationResult.js"

const route = Router()

route.get("/:id/quotes/:bookId?", validateId, validationResult)
route.post("/:id/quotes/:bookId", validateId, validateCreationHighlight, validationResult)
route.patch("/:id/quotes/:quotesId", validateId, validateUpdateHighlight, validationResult)
route.delete("/:id/quotes/:quotesId", validateId, validationResult)

export default route
