class QuoteServiceObject {
    getBookQuotesModel({ bookId, userId }) {
        return {
            quotes: [],
            bookId,
            userId
        }
    }

    getBooksQuotesModel({ userId }) {
        return {
            quotes: [],
            userId
        }
    }

    createQuoteModel({ userId, bookId, items, bookLocale }) {
        return { userId, bookId, items, bookLocale }
    }

    updateQuoteModel({ quoteId, items, bookLocale }) {
        return { quoteId, items, bookLocale }
    }

    deleteQuoteModel({ quoteId }) {
        return { quoteId }
    }
}

export { QuoteServiceObject }