import { BookModels } from "../../models/books/bookModels.js"

class BookServices {
    constructor() {
        this.bookModels = new BookModels()
    }
    
    async getBookService ({ id }) {
        let queryResponse = null

        if (id) {
            queryResponse = await this.bookModels.getBookModel({ id })
        } else {
            queryResponse = await this.bookModels.getBooksModel()
        }

        const queryCount = {
            count: queryResponse.length
        }

        return {
            queryResponse, 
            queryCount
        }
    }

    createBookService () {

    }

    updateBookService () {

    }

    deleteBookService () {

    }
}

export { BookServices }