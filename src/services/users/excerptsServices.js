import { ulid } from "ulid"

class ExcerptsServices {
    async getExcerptsService({ id, bookId }, excerptsModels) {
        let getExcerptsModel = null

        if (bookId) {
            getExcerptsModel = await excerptsModels.getBookExcerptsModel({ id, bookId })
        } else {
            getExcerptsModel = await excerptsModels.getBooksExcerptsModel({ id })
        }

        const queryCount = {
            count: getExcerptsModel.length
        }

        return {
            getExcerptsModel,
            queryCount
        }
    }

    async createExcerptService({ id, bookId, items }, excerptsModels) {
        items.id = ulid()

        items.privacy || (items.privacy = true)

        const { book_locale: bookLocale } = items

        bookLocale.id = ulid()
        
        const createExcerptModel = await excerptsModels.createExcerptModel({ id, bookId, items, bookLocale })

        return {
            ...createExcerptModel
        }
    }

    async updateExcerptService({ excerptId, items }, excerptsModels) {
        const { book_locale: bookLocale } = items
        delete items.book_locale

        const updateExcerptModel = await excerptsModels.updateExcerptModel({ excerptId, items, bookLocale })

        return {
            ...updateExcerptModel
        }
    }

    async deleteExcerptService({ excerptId }, excerptsModels) {
        const deleteExcerptModel = await excerptsModels.deleteExcerptModel({ excerptId })

        return {
            ...deleteExcerptModel
        }
    }
}

export { ExcerptsServices }
