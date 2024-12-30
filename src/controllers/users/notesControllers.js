import { NotesServices } from "../../services/users/notesServices.js"
import { NotesModels } from "../../models/users/notesModels.js"

class NotesControllers {
    constructor () {
        this.notesServices = new NotesServices()
        this.notesModels = new NotesModels()
    }

    getNotesController = async (req, res) => {
        const { id, bookId } = req.params

        const result = await this.notesServices.getNotesService({ id, bookId }, this.notesModels)

        res.status(200).json({
            "status": "success",
            ...result.queryCount,
            items: result.getNotesModel
        })
    }

    createNoteController = async (req, res) => {
        const { id, bookId } = req.params
        const items = req.body

        const result = await this.notesServices.createNoteService({ id, bookId, items }, this.notesModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    updateNoteController = async (req, res) => {
        const { noteId } = req.params
        const items = req.body

        const result = await this.notesServices.updateNoteService({ noteId, items }, this.notesModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    deleteNoteController = async (req, res) => {
        const { noteId } = req.params

        const result = await this.notesServices.deleteNoteService({ noteId }, this.notesModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { NotesControllers }
