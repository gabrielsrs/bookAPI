import { BookDetailsModels } from "../../models/books/bookDetailsModels.js"
import { BookModels } from "../../models/books/bookModels.js"

class BookDetailsServices {
    constructor () {
        this.bookDetailsModels = new BookDetailsModels()
        this.bookModels = new BookModels()
    }

    async getBookNotesService ({ id }) {
        const getBookNotesModel = await this.bookDetailsModels.getBookNotesModel({ id })
        const notesCount = {
            count: getBookNotesModel.length
        }

        return {
            getBookNotesModel,
            notesCount
        }
    }

    async getBookQuotesService  ({ id }) {
        const getBookQuotesModel = await this.bookDetailsModels.getBookQuotesModel({ id })
        const quotesCount = {
            count: getBookQuotesModel.length
        }

        return {
            getBookQuotesModel,
            quotesCount
        }
    }

    async getBookExcerptsService ({ id }) {
        const getBookExcerptsModel = await this.bookDetailsModels.getBookExcerptsModel({ id })
        const excerptsCount = {
            count: getBookExcerptsModel.length
        }
        
        return {
            getBookExcerptsModel,
            excerptsCount
        }
    }

    async getBookBookmarksService ({ id }) {
        const getBookBookmarksModel = await this.bookDetailsModels.getBookBookmarksModel({ id })
        const bookmarksCount = {
            count: getBookBookmarksModel.length
        }
        
        return {
            getBookBookmarksModel,
            bookmarksCount
        }
    }

    async getBookMetadataService ({ id }) {
        const getBookMetadataModel = await this.bookDetailsModels.getBookMetadataModel({ id })
        
        return getBookMetadataModel
    }
}

export { BookDetailsServices }