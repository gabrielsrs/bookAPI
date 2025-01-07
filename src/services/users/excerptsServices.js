import { ulid } from "ulid"

class ExcerptsServices {
    async getExcerptsService({ userId, bookId }, excerptsModels) {
        let getExcerptsModel

        if (bookId) {
            getExcerptsModel = await excerptsModels.getBookExcerptsModel({ userId, bookId })
        } else {
            getExcerptsModel = await excerptsModels.getBooksExcerptsModel({ userId })
        }

        return {
            count: getExcerptsModel.excerpts.length,
            ...getExcerptsModel
        }
    }

    async createExcerptService({ userId, bookId, items }, excerptsModels) {
        items.excerptId = ulid()

        "privacy" in items || (items.privacy = true)

        const { book_locale: bookLocale } = items

        bookLocale.bookLocaleId = ulid()
        
        const createExcerptModel = await excerptsModels.createExcerptModel({ userId, bookId, items, bookLocale })

        return createExcerptModel
    }

    async updateExcerptService({ excerptId, items }, excerptsModels) {
        const { book_locale: bookLocale } = items
        delete items.book_locale

        const updateExcerptModel = await excerptsModels.updateExcerptModel({ excerptId, items, bookLocale })

        return updateExcerptModel
    }

    async deleteExcerptService({ excerptId }, excerptsModels) {
        const deleteExcerptModel = await excerptsModels.deleteExcerptModel({ excerptId })

        return deleteExcerptModel
    }
}

export { ExcerptsServices }
