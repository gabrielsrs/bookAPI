import { BookDetailsServices } from "../../services/book/bookDetailsServices.js"
import { BookDetailsModels } from "../../models/books/bookDetailsModels.js"

class BookDetailsControllers {
    constructor () {
        this.bookDetailsServices = new BookDetailsServices()
        this.bookDetailsModels = new BookDetailsModels()
    }

    getBookNotesController = async (req, res) => {
        const { bookId } = req.params

        const result = await this.bookDetailsServices.getBookNotesService({ bookId }, this.bookDetailsModels)

        res.status(200).json({
            "status": "success",
            ...result.notesCount,
            items: result.getBookNotesModel
        })
    }

    getBookQuotesController = async (req, res) => {
        const { bookId } = req.params

        const result = await this.bookDetailsServices.getBookQuotesService({ bookId }, this.bookDetailsModels)

        res.status(200).json({
            "status": "success",
            ...result.quotesCount,
            items: result.getBookQuotesModel
        })
    }

    getBookExcerptsController = async (req, res) => {
        const { bookId } = req.params

        const result = await this.bookDetailsServices.getBookExcerptsService({ bookId }, this.bookDetailsModels)

        res.status(200).json({
            "status": "success",
            ...result.excerptsCount,
            items: result.getBookExcerptsModel
        })
    }

    getBookBookmarksController = async (req, res) => {
        const { bookId } = req.params

        const result = await this.bookDetailsServices.getBookBookmarksService({ bookId }, this.bookDetailsModels)

        res.status(200).json({
            "status": "success",
            ...result.bookmarksCount,
            items: result.getBookBookmarksModel
        })
    }

    getBookMetadataController = async (req, res) => {
        const { bookId } = req.params

        const result = await this.bookDetailsServices.getBookMetadataService({ bookId }, this.bookDetailsModels)

        res.status(200).json({
            "status": "success",
            "metadata": result
        })
    }
}

export { BookDetailsControllers }