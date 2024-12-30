class UserBooksServices {
    async getUserBooksService({ id }, userBooksModels) {
        const getUserBooksModel = await userBooksModels.getUserBooksModel({ id })
        const queryCount = {
            count: getUserBooksModel.length
        }

        return {
            getUserBooksModel,
            queryCount
        }
    }

    async addUserBookService({ id, bookId }, userBooksModels) {
        const addUserBookModel = await userBooksModels.addUserBookModel({ id, bookId })

        return {
            ...addUserBookModel
        }
    }

    async removeUserBookService({ id, bookId }, userBooksModels) {
        const removeUserBookModel = await userBooksModels.removeUserBookModel({ id, bookId })

        return {
            ...removeUserBookModel
        }
    }
}

export { UserBooksServices };
