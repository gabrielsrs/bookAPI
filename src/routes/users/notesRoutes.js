import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationNote, validateUpdateNote } from "../../middlewares/validation/user/notesValidators.js"
import validationResult from "../../middlewares/validation/validationResult.js"

const route = Router()

route.get("/:id/notes/:bookId?", validateId, validationResult)
route.post("/:id/notes/:bookId", validateId, validateCreationNote, validationResult)
route.patch("/:id/notes/:noteId", validateId, validateUpdateNote, validationResult)
route.delete("/:id/notes/:noteId", validateId, validationResult)

export default route
