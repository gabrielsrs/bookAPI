import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationReadingLater } from "../../middlewares/validation/user/readLaterValidator.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { ReadLaterControllers } from "../../controllers/users/readLaterControllers.js";

const route = Router()

const readLaterControllers = new ReadLaterControllers()

route.get("/:id/readLater", validateId, validationResult, readLaterControllers.getReadLaterController) 
route.post("/:id/readLater/:bookId", validateId, validateCreationReadingLater, validationResult) 
route.delete("/:id/readLater/:bookId", validateId, validationResult)

export default route
