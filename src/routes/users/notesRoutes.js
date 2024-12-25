import { Router } from "express";
import { validateId } from "../../middlewares/validation/common/idValidator.js"
import { validateCreationNote, validateUpdateNote } from "../../middlewares/validation/user/notesValidators.js"
import validationResult from "../../middlewares/validation/validationResult.js"

import { NotesControllers } from "../../controllers/users/notesControllers.js"

const route = Router()

const notesControllers = new NotesControllers()

route.get("/:userId/notes/:bookId?", validateId, validationResult, notesControllers.getNotesController)
route.post("/:userId/notes/:bookId", validateId, validateCreationNote, validationResult, notesControllers.createNoteController)
route.patch("/:userId/notes/:noteId", validateId, validateUpdateNote, validationResult, notesControllers.updateNoteController)
route.delete("/:userId/notes/:noteId", validateId, validationResult, notesControllers.deleteNoteController)

export default route
