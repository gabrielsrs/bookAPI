import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationHighlight, validateUpdateHighlight } from "../../middlewares/validation/user/highlightValidators.js"
import validationResult from "../../middlewares/validation/validationResult.js"

const route = Router()

route.get("/:id/quotes/:bookId?", validateId, validationResult)
route.post("/:id/quotes/:bookId", validateId, validateCreationHighlight, validationResult)
route.patch("/:id/quotes/:quotesId", validateId, validateUpdateHighlight, validationResult)
route.delete("/:id/quotes/:quotesId", validateId, validationResult)

export default route
