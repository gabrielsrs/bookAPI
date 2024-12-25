import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateProgress, validateCreationGoal, validateUpdateGoal } from "../../middlewares/validation/user/readingValidators.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { ReadingControllers } from "../../controllers/users/readingControllers.js";

const route = Router()

const readingControllers = new ReadingControllers()

route.get("/:userId/reading/:bookId/progress", validateId, validationResult, readingControllers.getReadingProgressController) 
route.post("/:userId/reading/:bookId/progress", validateId, validateProgress, validationResult, readingControllers.createReadingProgressController) 
route.put("/:userId/reading/:bookId/progress/:progressId", validateId, validateProgress, validationResult, readingControllers.updateReadingProgressController) 
route.get("/:userId/reading/:bookId/goals", validateId, validationResult, readingControllers.getReadingGoalsController) 
route.post("/:userId/reading/:bookId/goals", validateId, validateCreationGoal, validationResult, readingControllers.createReadingGoalController) 
route.patch("/:userId/reading/:bookId/goals/:goalId", validateUpdateGoal, validateId, validationResult, readingControllers.updateReadingGoalController) 
route.delete("/:userId/reading/:bookId/goals/:goalId", validateId, validationResult, readingControllers.deleteReadingGoalController) 

export default route
