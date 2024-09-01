import { BookServices } from "../../services/book/bookServices.js"

class BookControllers {
    getBookController (req, res) {
        const { id } = req.params

        const bookService = new BookServices()

        const result = bookService.getBookService(id)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    createBookController (req, res) {
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


        const bookService = new BookServices()

        const result = bookService.createBookService()

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    updateBookController (req, res) {
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

        const bookService = new BookServices()

        const result = bookService.updateBookService()

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    deleteBookController (req, res) {
        const { id } = req.params

        const bookService = new BookServices()

        const result = bookService.deleteBookService(id)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { BookControllers }