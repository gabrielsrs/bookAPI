import { ulid } from 'ulid'
import dayjs from "dayjs"

class NotesServices {
  async getNotesService({userId, bookId}, notesModels) {
    let getNotesModel = null

    if (bookId) {
      getNotesModel = await notesModels.getBookNotesModel({userId, bookId})
    } else {
      getNotesModel = await notesModels.getBooksNotesModel({userId})
    }

    return {
      count: getNotesModel.notes.length,
      ...getNotesModel
    }
  }

  async createNoteService ({ userId, bookId, items }, notesModels) {
    items.noteId = ulid()

    "privacy" in items || (items.privacy = true)

    items.updatedAt = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")

    const { book_locale: bookLocale } = items

    bookLocale && (bookLocale.bookLocaleId = ulid())
    
    const createNoteModel = await notesModels.createNoteModel({ userId, bookId, items, bookLocale })

    return createNoteModel
  }

  async updateNoteService({ noteId, items }, notesModels) {
    const { book_locale: bookLocale } = items
    delete items.book_locale

    items.updated_at = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")

    const updateNoteModel = await notesModels.updateNoteModel({ noteId, items, bookLocale })

    return updateNoteModel
  }

  async deleteNoteService({ noteId }, notesModels) {
    const deleteNoteModel = await notesModels.deleteNoteModel({ noteId })

    return deleteNoteModel
  }
}

export { NotesServices };
