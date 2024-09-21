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
        const { 
            title, 
            isbn_10, 
            isbn_13, 
            pages, 
            language, 
            cover_image, 
            publication_date, 
            summary,
            authors,
            publishers,
            tags,
            categories
        } = req.body


        const result = await this.bookService.createBookService()

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    updateBookController = async (req, res) => {
        const { id } = req.params
        const { 
            title, 
            isbn_10, 
            isbn_13, 
            pages, 
            language, 
            cover_image, 
            publication_date, 
            summary,
            authors,
            publishers,
            tags,
            categories
        } = req.body

        const result = await this.bookService.updateBookService()

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    deleteBookController = async (req, res) => {
        const { id } = req.params

        const result = await this.bookService.deleteBookService(id)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { BookControllers }