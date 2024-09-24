import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { ratingCreateValidator, ratingUpdateValidator } from "../../middlewares/validation/book/ratingValidators.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { RatingControllers } from "../../controllers/books/ratingControllers.js"

const route = Router() 
const ratingControllers = new RatingControllers()

route.get("/:id/ratings", validateId, validationResult, ratingControllers.getRatingsController) 
route.post("/:id/:userId/rating", validateId, ratingCreateValidator, validationResult) 
route.patch("/:id/:userId/rating/:ratingId", validateId, ratingUpdateValidator, validationResult) 
route.delete("/:id/:userId/rating/:ratingId", validateId, validationResult) 

export default route