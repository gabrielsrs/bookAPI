class BookDetailsServices {
    async getBookNotesService ({ bookId }, bookDetailsModels) {
        const getBookNotesModel = await bookDetailsModels.getBookNotesModel({ bookId })

        return {
            count: getBookNotesModel.notes.length,
            ...getBookNotesModel
        }
    }

    async getBookQuotesService  ({ bookId }, bookDetailsModels) {
        const getBookQuotesModel = await bookDetailsModels.getBookQuotesModel({ bookId })

        return {
            count: getBookQuotesModel.quotes.length,
            ...getBookQuotesModel
        }
    }

    async getBookExcerptsService ({ bookId }, bookDetailsModels) {
        const getBookExcerptsModel = await bookDetailsModels.getBookExcerptsModel({ bookId })
        
        return {
            count: getBookExcerptsModel.excerpts.length,
            ...getBookExcerptsModel
        }
    }

    async getBookBookmarksService ({ bookId }, bookDetailsModels) {
        const getBookBookmarksModel = await bookDetailsModels.getBookBookmarksModel({ bookId })
        
        return {
            count: getBookBookmarksModel.bookmarks.length,
            ...getBookBookmarksModel
        }
    }

    async getBookMetadataService ({ bookId }, bookDetailsModels) {
        const getBookMetadataModel = await bookDetailsModels.getBookMetadataModel({ bookId })
        
        return getBookMetadataModel
    }
}

export { BookDetailsServices }