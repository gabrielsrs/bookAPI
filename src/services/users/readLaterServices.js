import { ulid } from 'ulid'
import dayjs from "dayjs"

class ReadLaterServices {
    async getReadLaterService({ id }, readLaterModels) {
        const getReadLetterModel = await readLaterModels.getReadLaterModel({ id })
        const queryCount = {
            count: getReadLetterModel.length
        }

        return {
            getReadLetterModel,
            queryCount
        }
    }

    async createReadLaterService({ id, bookId, items }, readLaterModels) {
        items.id = ulid()
        items.userId = id
        items.bookId = bookId
        items.updated_at = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")

        items.privacy || (items.privacy = false)

        const createReadLaterModel = await readLaterModels.createReadLaterModel({ items })
        
        return {
            ...createReadLaterModel
        }
    }

    async deleteReadLaterService({ id: userId, bookId }, readLaterModels) {
        const deleteReadLaterModel = await readLaterModels.deleteReadLaterModel({ userId, bookId })

        return { 
            ...deleteReadLaterModel
        }
    }
}

export { ReadLaterServices }
