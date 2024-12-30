import { BookServices } from "../../services/book/bookServices.js"
import { BookModels } from "../../models/books/bookModels.js"

class BookControllers {
    constructor () {
        this.bookService = new BookServices()
        this.bookModels = new BookModels()
    }

    getBookController = async (req, res) => {
        const { bookId } = req.params

        const result = await this.bookService.getBookService({ bookId }, this.bookModels)

        res.status(200).json({
            "status": "success",
            ...result.queryCount,
            items: result.queryResponse
        })
    }

    createBookController = async (req, res) => {
        const items = req.body

        const result = await this.bookService.createBookService(items, this.bookModels)

        res.status(200).json({
            "status": "success",
            "message": "Book created successfully",
            data: result
        })
    }

    updateBookController = async (req, res) => {
        const { bookId } = req.params
        const items = req.body

        const result = await this.bookService.updateBookService({ bookId, items }, this.bookModels)

        res.status(200).json({
            "status": "success",
            "message": "Book updated successfully",
            ...result
        })
    }

    deleteBookController = async (req, res) => {
        const { bookId } = req.params

        const result = await this.bookService.deleteBookService({ bookId }, this.bookModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { BookControllers }