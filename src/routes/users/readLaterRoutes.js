import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationReadingLater } from "../../middlewares/validation/user/readLaterValidator.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { ReadLaterControllers } from "../../controllers/users/readLaterControllers.js";

const route = Router()

const readLaterControllers = new ReadLaterControllers()

route.get("/:userId/readLater", validateId, validationResult, readLaterControllers.getReadLaterController) 
route.post("/:userId/readLater/:bookId", validateId, validateCreationReadingLater, validationResult, readLaterControllers.createReadLaterController) 
route.delete("/:userId/readLater/:bookId", validateId, validationResult, readLaterControllers.deleteReadLaterController)

export default route
