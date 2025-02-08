class NotesServiceObject {
    getBookNotesModel({ bookId, userId }) {
        return {
            notes: [],
            bookId,
            userId
        }
    }

    getBooksNotesModel({ userId }) {
        return {
            notes: [],
            userId
        }
    }

    createNoteModel({ userId, bookId, items, bookLocale }) {
        return { userId, bookId, items, bookLocale }
    }

    updateNoteModel({ noteId, items, bookLocale }) {
        return { noteId, items, bookLocale }
    }

    deleteNoteModel({ noteId }) {
        return { noteId }
    }
}

export { NotesServiceObject }