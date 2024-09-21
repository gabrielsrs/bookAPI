import { BookDetailsServices } from "../../services/book/bookDetailsServices.js"

class BookDetailsControllers {
    constructor () {
        this.bookDetailsServices = new BookDetailsServices()
    }

    getBookNotesController = async (req, res) => {
        const { id } = req.params

        const result = await this.bookDetailsServices.getBookNotesService({ id })

        res.status(200).json({
            "status": "success",
            ...result.notesCount,
            items: result.getBookNotesModel
        })
    }

    getBookQuotesController = async (req, res) => {
        const { id } = req.params

        const result = await this.bookDetailsServices.getBookQuotesService({ id })

        res.status(200).json({
            "status": "success",
            ...result.quotesCount,
            items: result.getBookQuotesModel
        })
    }

    getBookExcerptsController = async (req, res) => {
        const { id } = req.params

        const result = await this.bookDetailsServices.getBookExcerptsService({ id })

        res.status(200).json({
            "status": "success",
            ...result.excerptsCount,
            items: result.getBookExcerptsModel
        })
    }

    getBookBookmarksController = async (req, res) => {
        const { id } = req.params

        const result = await this.bookDetailsServices.getBookBookmarksService({ id })

        res.status(200).json({
            "status": "success",
            ...result.bookmarksCount,
            items: result.getBookBookmarksModel
        })
    }

    getBookMetadataController = async (req, res) => {
        const { id } = req.params

        const result = await this.bookDetailsServices.getBookMetadataService({ id })

        res.status(200).json({
            "status": "success",
            "metadata": result
        })
    }
}

export { BookDetailsControllers }