class ExcerptServiceObject {
    getBookExcerptsModel({ bookId, userId }) {
        return {
            excerpts: [],
            bookId,
            userId
        }
    }

    getBooksExcerptsModel({ userId }) {
        return {
            excerpts: [],
            userId
        }
    }

    createExcerptModel({ userId, bookId, items, bookLocale }) {
        return { userId, bookId, items, bookLocale }
    }

    updateExcerptModel({ excerptId, items, bookLocale }) {
        return { excerptId, items, bookLocale }
    }

    deleteExcerptModel({ excerptId }) {
        return { excerptId }
    }
}

export { ExcerptServiceObject }