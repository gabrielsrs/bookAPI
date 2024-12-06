import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationHighlight, validateUpdateHighlight } from "../../middlewares/validation/user/highlightValidators.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { QuotesControllers } from "../../controllers/users/quotesControllers.js";

const route = Router()

const quotesControllers = new QuotesControllers()

route.get("/:id/quotes/:bookId?", validateId, validationResult, quotesControllers.getQuotesController)
route.post("/:id/quotes/:bookId", validateId, validateCreationHighlight, validationResult, quotesControllers.createQuoteController)
route.patch("/:id/quotes/:quoteId", validateId, validateUpdateHighlight, validationResult, quotesControllers.updateQuoteController)
route.delete("/:id/quotes/:quoteId", validateId, validationResult, quotesControllers.deleteQuoteController)

export default route
