import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateProgress, validateCreationGoal, validateUpdateGoal } from "../../middlewares/validation/user/readingValidators.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { ReadingControllers } from "../../controllers/users/readingControllers.js";

const route = Router()

const readingControllers = new ReadingControllers()

route.get("/:id/:bookId/reading/progress", validateId, validationResult, readingControllers.getReadingProgressController) 
route.post("/:id/:bookId/reading/progress", validateId, validateProgress, validationResult) 
route.put("/:id/:bookId/reading/progress/:progressId", validateId, validateProgress, validationResult) 
route.get("/:id/:bookId/reading/goals", validateId, validationResult, readingControllers.getReadingGoalsController) 
route.post("/:id/:bookId/reading/goals", validateId, validateCreationGoal, validationResult) 
route.patch("/:id/:bookId/reading/goals/:goalId", validateUpdateGoal, validateId, validationResult) 
route.delete("/:id/:bookId/reading/goals/:goalId", validateId, validationResult) 

export default route
