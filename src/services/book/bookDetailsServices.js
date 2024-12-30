class BookDetailsServices {
    async getBookNotesService ({ id }, bookDetailsModels) {
        const getBookNotesModel = await bookDetailsModels.getBookNotesModel({ id })
        const notesCount = {
            count: getBookNotesModel.length
        }

        return {
            getBookNotesModel,
            notesCount
        }
    }

    async getBookQuotesService  ({ id }, bookDetailsModels) {
        const getBookQuotesModel = await bookDetailsModels.getBookQuotesModel({ id })
        const quotesCount = {
            count: getBookQuotesModel.length
        }

        return {
            getBookQuotesModel,
            quotesCount
        }
    }

    async getBookExcerptsService ({ id }, bookDetailsModels) {
        const getBookExcerptsModel = await bookDetailsModels.getBookExcerptsModel({ id })
        const excerptsCount = {
            count: getBookExcerptsModel.length
        }
        
        return {
            getBookExcerptsModel,
            excerptsCount
        }
    }

    async getBookBookmarksService ({ id }, bookDetailsModels) {
        const getBookBookmarksModel = await bookDetailsModels.getBookBookmarksModel({ id })
        const bookmarksCount = {
            count: getBookBookmarksModel.length
        }
        
        return {
            getBookBookmarksModel,
            bookmarksCount
        }
    }

    async getBookMetadataService ({ id }, bookDetailsModels) {
        const getBookMetadataModel = await bookDetailsModels.getBookMetadataModel({ id })
        
        return {
            getBookMetadataModel
        }
    }
}

export { BookDetailsServices }