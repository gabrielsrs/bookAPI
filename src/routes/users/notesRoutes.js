import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationNote, validateUpdateNote } from "../../middlewares/validation/user/notesValidators.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { NotesControllers } from "../../controllers/users/notesControllers.js"

const route = Router()

const notesControllers = new NotesControllers()

route.get("/:id/notes/:bookId?", validateId, validationResult, notesControllers.getNotesController)
route.post("/:id/notes/:bookId", validateId, validateCreationNote, validationResult, notesControllers.createNoteController)
route.patch("/:id/notes/:noteId", validateId, validateUpdateNote, validationResult, notesControllers.updateNoteController)
route.delete("/:id/notes/:noteId", validateId, validationResult, notesControllers.deleteNoteController)

export default route
