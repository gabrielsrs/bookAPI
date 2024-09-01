import { BookDetailsServices } from "../../services/book/bookDetailsServices.js"

class BookDetailsControllers {
    constructor () {
        this.bookDetailsServices = new BookDetailsServices()
    }

    getBookNotesController (req, res) {
        const { id } = req.params

        const result = this.bookDetailsServices.getBookNotesService(id)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    getBookQuotesController  (req, res) {
        const { id } = req.params

        const result = this.bookDetailsServices.getBookQuotesService(id)

        res.status(200).json({
            "status": "success",
            ...result
        })

    }

    getBookExcerptsController (req, res) {
        const { id } = req.params

        const result = this.bookDetailsServices.getBookExcerptsService(id)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    getBookBookmarksController (req, res) {
        const { id } = req.params

        const result = this.bookDetailsServices.getBookBookmarksService(id)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    getBookMetadataController (req, res) {
        const { id } = req.params

        const result = this.bookDetailsServices.getBookMetadataService(id)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { BookDetailsControllers }