import { BookDetailsServices } from "../../services/book/bookDetailsServices.js"
import { BookDetailsModels } from "../../models/books/bookDetailsModels.js"

class BookDetailsControllers {
    constructor () {
        this.bookDetailsServices = new BookDetailsServices()
        this.bookDetailsModels = new BookDetailsModels()
    }

    getBookNotesController = async (req, res) => {
        const { id } = req.params

        const result = await this.bookDetailsServices.getBookNotesService({ id }, this.bookDetailsModels)

        res.status(200).json({
            "status": "success",
            ...result.notesCount,
            items: result.getBookNotesModel
        })
    }

    getBookQuotesController = async (req, res) => {
        const { id } = req.params

        const result = await this.bookDetailsServices.getBookQuotesService({ id }, this.bookDetailsModels)

        res.status(200).json({
            "status": "success",
            ...result.quotesCount,
            items: result.getBookQuotesModel
        })
    }

    getBookExcerptsController = async (req, res) => {
        const { id } = req.params

        const result = await this.bookDetailsServices.getBookExcerptsService({ id }, this.bookDetailsModels)

        res.status(200).json({
            "status": "success",
            ...result.excerptsCount,
            items: result.getBookExcerptsModel
        })
    }

    getBookBookmarksController = async (req, res) => {
        const { id } = req.params

        const result = await this.bookDetailsServices.getBookBookmarksService({ id }, this.bookDetailsModels)

        res.status(200).json({
            "status": "success",
            ...result.bookmarksCount,
            items: result.getBookBookmarksModel
        })
    }

    getBookMetadataController = async (req, res) => {
        const { id } = req.params

        const result = await this.bookDetailsServices.getBookMetadataService({ id }, this.bookDetailsModels)

        res.status(200).json({
            "status": "success",
            "metadata": result
        })
    }
}

export { BookDetailsControllers }