import { NotesModels } from "../../models/users/notesModels.js";
import { ulid } from 'ulid'

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

  async createNoteService ({ id, bookId, items }) {
    items.id = ulid()

    items.privacy || (items.privacy = true)

    items.updatedAt = dayjs().format("YYYY-DD-MM[T]HH:mm:ss")

    const { book_locale: bookLocale } = items

    bookLocale && (bookLocale.id = ulid())
    
    const createNoteModel = await this.notesModels.createNoteModel({ id, bookId, items, bookLocale })

    return {
      ...createNoteModel
    }
  }

  async updateNoteService({ noteId, items }) {
    const { book_locale: bookLocale } = items

    items.updatedAt = dayjs().format("YYYY-DD-MM[T]HH:mm:ss")

    const updateNoteModel = await this.notesModels.updateNoteModel({ noteId, items, bookLocale })

    return {
      ...updateNoteModel
    }
  }

  async deleteNoteService({ noteId }) {
    const deleteNoteModel = await this.notesModels.deleteNoteModel({ noteId })

    return {
      ...deleteNoteModel
    }
  }
}

export { NotesServices };
  