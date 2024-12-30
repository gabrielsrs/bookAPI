class UserBooksServices {
    async getUserBooksService({ userId }, userBooksModels) {
        const getUserBooksModel = await userBooksModels.getUserBooksModel({ userId })
        const queryCount = {
            count: getUserBooksModel.length
        }

        return {
            getUserBooksModel,
            queryCount
        }
    }

    async addUserBookService({ userId, bookId }, userBooksModels) {
        const addUserBookModel = await userBooksModels.addUserBookModel({ userId, bookId })

        return {
            ...addUserBookModel
        }
    }

    async removeUserBookService({ userId, bookId }, userBooksModels) {
        const removeUserBookModel = await userBooksModels.removeUserBookModel({ userId, bookId })

        return {
            ...removeUserBookModel
        }
    }
}

export { UserBooksServices };
