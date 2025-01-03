class BookServiceObject {
    getBookModel({ bookId }) {
        return bookId
    }

    getBooksModel() {
        return {
            books: []
        }
    }

    createBookModel({ items }) {
        return items
    }

    updateBookModel(book, items) {
        return {
            book,
            items
        }
    }

    deleteBookModel({ bookId }) {
        return bookId
    }
}

export { BookServiceObject }