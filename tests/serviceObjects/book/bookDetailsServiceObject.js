class BookServiceObject {
    getBookNotesModel({ bookId }) {
        return {
            notes: [],
            bookId
        }
    }

    getBookQuotesModel({ bookId }) {
        return {
            quotes: [],
            bookId
        }
    }

    getBookExcerptsModel({ bookId }) {
        return {
            excerpts: [],
            bookId
        }
    }

    getBookBookmarksModel({ bookId }) {
        return {
            bookmarks: [],
            bookId
        }
    }

    getBookMetadataModel({ bookId }) {
        return {
            bookId
        }
    }
}

export { BookServiceObject }