import { BookDetailsServices } from "../../services/book/bookDetailsServices.js"

class BookDetailsControllers {
    getBookNotesController (req, res) {
        const { id } = req.params

        const bookDetailsServices = new BookDetailsServices()

        const result = bookDetailsServices.getBookNotesService(id)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    getBookQuotesController  (req, res) {
        const { id } = req.params

        const bookDetailsServices = new BookDetailsServices()

        const result = bookDetailsServices.getBookQuotesService(id)

        res.status(200).json({
            "status": "success",
            ...result
        })

    }

    getBookExcerptsController (req, res) {
        const { id } = req.params

        const bookDetailsServices = new BookDetailsServices()

        const result = bookDetailsServices.getBookExcerptsService(id)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    getBookBookmarksController (req, res) {
        const { id } = req.params

        const bookDetailsServices = new BookDetailsServices()

        const result = bookDetailsServices.getBookBookmarksService(id)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    getBookMetadataController (req, res) {
        const { id } = req.params

        const bookDetailsServices = new BookDetailsServices()

        const result = bookDetailsServices.getBookMetadataService(id)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { BookDetailsControllers }