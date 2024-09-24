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
  
    createNoteController (req, res) {
      const { id, bookId } = req.params
      const { content, privacy, book_locale } = req.body

      const result = this.notesServices.createNoteService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    updateNoteController (req, res) {
      const { id, noteId } = req.params
      const { content, privacy, book_locale } = req.body

      const result = this.notesServices.updateNoteService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    deleteNoteController (req, res) {
      const { id, noteId } = req.params

      const result = this.notesServices.deleteNoteService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  }
  
  export { NotesControllers }
  