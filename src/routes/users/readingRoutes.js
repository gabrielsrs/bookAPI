import { Router } from "express";
import { validateId } from "../../middleware/validation/common/idValidator.js"
import { validateProgress, validateCreationGoal, validateUpdateGoal } from "../../middleware/validation/user/readingValidators.js"
import validationResult from "../../middleware/validation/validationResult.js"

const route = Router()

route.get("/:id/:bookId/reading/progress", validateId, validationResult) 
route.post("/:id/:bookId/reading/progress", validateId, validateProgress, validationResult) 
route.put("/:id/:bookId/reading/progress/:progressId", validateId, validateProgress, validationResult) 
route.get("/:id/:bookId/reading/goals", validateId, validationResult) 
route.post("/:id/:bookId/reading/goals", validateId, validateCreationGoal, validationResult) 
route.patch("/:id/:bookId/reading/goals/:goalId", validateUpdateGoal, validateId, validationResult) 
route.delete("/:id/:bookId/reading/goals/:goalId", validateId, validationResult) 

export default route
