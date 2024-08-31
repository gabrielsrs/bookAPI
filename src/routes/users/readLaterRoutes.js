import { Router } from "express";
import { validateId } from "../../middleware/validation/common/idValidator.js"
import { validateCreationReadingLater } from "../../middleware/validation/user/readLaterValidator.js"
import validationResult from "../../middleware/validation/validationResult.js"

const route = Router()

route.get("/:id/readLater", validateId, validationResult) 
route.post("/:id/readLater/:bookId", validateId, validateCreationReadingLater, validationResult) 
route.delete("/:id/readLater/:bookId", validateId, validationResult)

export default route
