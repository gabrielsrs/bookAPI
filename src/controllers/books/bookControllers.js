import { BookServices } from "../../services/book/bookServices.js"

class BookControllers {
    constructor () {
        this.bookService = new BookServices()
    }

    getBookController = async (req, res) => {
        const { id } = req.params

        const result = await this.bookService.getBookService({ id })

        res.status(200).json({
            "status": "success",
            ...result.queryCount ,
            items: result.queryResponse
        })
    }

    createBookController = async (req, res) => {
        const items = req.body


        const result = await this.bookService.createBookService(items)

        res.status(200).json({
            "status": "success",
            "message": "Book created successfully",
            data: result
        })
    }

    updateBookController = async (req, res) => {
        const { id } = req.params
        const items = req.body

        const result = await this.bookService.updateBookService({id, items})

        res.status(200).json({
            "status": "success",
            "message": "Book updated successfully",
            ...result
        })
    }

    deleteBookController = async (req, res) => {
        const { id } = req.params

        const result = await this.bookService.deleteBookService({id})

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { BookControllers }