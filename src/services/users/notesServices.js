import { ulid } from 'ulid'
import dayjs from "dayjs"

class NotesServices {
  async getNotesService({id, bookId}, notesModels) {
    let getNotesModel = null

    if (bookId) {
      getNotesModel = await notesModels.getBookNotesModel({id, bookId})
    } else {
      getNotesModel = await notesModels.getBooksNotesModel({id})
    }

    const queryCount = {
      count: getNotesModel.length
    }

    return {
      getNotesModel,
      queryCount
    }
  }

  async createNoteService ({ id, bookId, items }, notesModels) {
    items.id = ulid()

    items.privacy || (items.privacy = true)

    items.updatedAt = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")

    const { book_locale: bookLocale } = items

    bookLocale && (bookLocale.id = ulid())
    
    const createNoteModel = await notesModels.createNoteModel({ id, bookId, items, bookLocale })

    return {
      ...createNoteModel
    }
  }

  async updateNoteService({ noteId, items }, notesModels) {
    const { book_locale: bookLocale } = items
    delete items.book_locale

    items.updated_at = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")

    const updateNoteModel = await notesModels.updateNoteModel({ noteId, items, bookLocale })

    return {
      ...updateNoteModel
    }
  }

  async deleteNoteService({ noteId }, notesModels) {
    const deleteNoteModel = await notesModels.deleteNoteModel({ noteId })

    return {
      ...deleteNoteModel
    }
  }
}

export { NotesServices };
