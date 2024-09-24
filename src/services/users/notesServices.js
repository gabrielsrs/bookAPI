import { NotesModels } from "../../models/users/notesModels.js";

class NotesServices {
  constructor () {
    this.notesModels = new NotesModels()
  }

  async getNotesService({id, bookId}) {
    let getNotesModel = null

    if (bookId) {
      getNotesModel = await this.notesModels.getBookNotesModel({id, bookId})
    } else {
      getNotesModel = await this.notesModels.getBooksNotesModel({id})
    }

    const queryCount = {
      count: getNotesModel.length
    }

    return {
      getNotesModel,
      queryCount
    }
  }

  createNoteService(req, res) {
    // Logic for POST /:id/notes/:bookId
  }

  updateNoteService(req, res) {
    // Logic for PATCH /:id/notes/:noteId
  }

  deleteNoteService(req, res) {
    // Logic for DELETE /:id/notes/:noteId
  }
}

export { NotesServices };
  