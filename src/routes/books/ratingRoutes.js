import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { ratingCreateValidator, ratingUpdateValidator } from "../../middlewares/validation/book/ratingValidators.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { RatingControllers } from "../../controllers/books/ratingControllers.js"

const route = Router() 
const ratingControllers = new RatingControllers()

route.get("/:bookId/ratings", validateId, validationResult, ratingControllers.getRatingsController) 
route.post("/:bookId/ratings/:userId", validateId, ratingCreateValidator, validationResult, ratingControllers.createRatingsController) 
route.patch("/:bookId/ratings/:userId/:rateId", validateId, ratingUpdateValidator, validationResult, ratingControllers.updateRatingsController) 
route.delete("/:bookId/ratings/:userId/:rateId", validateId, validationResult, ratingControllers.deleteRatingsController) 

export default route