class UserBookServiceObject {
    getUserBooksModel({ userId }) {
        return {
            userBooks: [],
            userId
        }
    }

    addUserBookModel({ userId, bookId }) {
        return { userId, bookId }
    }

    removeUserBookModel({ userId, bookId }) {
        return { userId, bookId }
    }
}

export { UserBookServiceObject }