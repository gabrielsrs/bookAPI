class BookDetailsServices {
    async getBookNotesService ({ bookId }, bookDetailsModels) {
        const getBookNotesModel = await bookDetailsModels.getBookNotesModel({ bookId })
        const notesCount = {
            count: getBookNotesModel.length
        }

        return {
            getBookNotesModel,
            notesCount
        }
    }

    async getBookQuotesService  ({ bookId }, bookDetailsModels) {
        const getBookQuotesModel = await bookDetailsModels.getBookQuotesModel({ bookId })
        const quotesCount = {
            count: getBookQuotesModel.length
        }

        return {
            getBookQuotesModel,
            quotesCount
        }
    }

    async getBookExcerptsService ({ bookId }, bookDetailsModels) {
        const getBookExcerptsModel = await bookDetailsModels.getBookExcerptsModel({ bookId })
        const excerptsCount = {
            count: getBookExcerptsModel.length
        }
        
        return {
            getBookExcerptsModel,
            excerptsCount
        }
    }

    async getBookBookmarksService ({ bookId }, bookDetailsModels) {
        const getBookBookmarksModel = await bookDetailsModels.getBookBookmarksModel({ bookId })
        const bookmarksCount = {
            count: getBookBookmarksModel.length
        }
        
        return {
            getBookBookmarksModel,
            bookmarksCount
        }
    }

    async getBookMetadataService ({ bookId }, bookDetailsModels) {
        const getBookMetadataModel = await bookDetailsModels.getBookMetadataModel({ bookId })
        
        return {
            getBookMetadataModel
        }
    }
}

export { BookDetailsServices }