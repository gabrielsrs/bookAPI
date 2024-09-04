import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationReadingLater } from "../../middlewares/validation/user/readLaterValidator.js"
import validationResult from "../../middlewares/validation/validationResult.js"

const route = Router()

route.get("/:id/readLater", validateId, validationResult) 
route.post("/:id/readLater/:bookId", validateId, validateCreationReadingLater, validationResult) 
route.delete("/:id/readLater/:bookId", validateId, validationResult)

export default route
