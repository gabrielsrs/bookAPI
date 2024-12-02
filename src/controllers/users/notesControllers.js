import { NotesServices } from "../../services/users/notesServices.js"

class NotesControllers {
    constructor () {
      this.notesServices = new NotesServices()
    }

    getNotesController = async (req, res) => {
      const { id, bookId } = req.params

      const result = await this.notesServices.getNotesService({id, bookId})

      res.status(200).json({
          "status": "success",
          ...result.queryCount,
          items: result.getNotesModel
      })
    }
  
    createNoteController = async (req, res) => {
      const { id, bookId } = req.params
      const items = req.body

      const result = await this.notesServices.createNoteService({ id, bookId, items })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    updateNoteController = async (req, res) => {
      const { noteId } = req.params
      const items = req.body

      const result = await this.notesServices.updateNoteService({ noteId, items })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    deleteNoteController = async (req, res) => {
      const { noteId } = req.params

      const result = await this.notesServices.deleteNoteService({ noteId })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  }
  
  export { NotesControllers }
  