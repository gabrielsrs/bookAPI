class UserBooksServices {
    async getUserBooksService({ userId }, userBooksModels) {
        const getUserBooksModel = await userBooksModels.getUserBooksModel({ userId })

        return {
            count: getUserBooksModel.userBooks.length,
            ...getUserBooksModel
        }
    }

    async addUserBookService({ userId, bookId }, userBooksModels) {
        const addUserBookModel = await userBooksModels.addUserBookModel({ userId, bookId })

        return addUserBookModel
    }

    async removeUserBookService({ userId, bookId }, userBooksModels) {
        const removeUserBookModel = await userBooksModels.removeUserBookModel({ userId, bookId })

        return removeUserBookModel
    }
}

export { UserBooksServices };
