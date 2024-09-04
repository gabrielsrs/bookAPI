import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationBook, validateUpdateBook } from "../../middlewares/validation/book/bookValidators.js"
import validationResult from "../../middlewares/validation/validationResult.js"

const route = Router() 

route.get("/:id?", validateId, validationResult) 
route.post("/", validateCreationBook, validationResult) 
route.patch("/:id", validateId, validateUpdateBook, validationResult) 
route.delete("/:id", validateId, validationResult, (req, res) => res.json({ param: req.params })) 

export default route
