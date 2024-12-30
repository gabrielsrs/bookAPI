import { ulid } from 'ulid'
import dayjs from "dayjs"

class ReadLaterServices {
    async getReadLaterService({ userId }, readLaterModels) {
        const getReadLetterModel = await readLaterModels.getReadLaterModel({ userId })
        const queryCount = {
            count: getReadLetterModel.length
        }

        return {
            getReadLetterModel,
            queryCount
        }
    }

    async createReadLaterService({ userId, bookId, items }, readLaterModels) {
        items.readLaterId = ulid()
        items.userId = userId
        items.bookId = bookId
        items.updated_at = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")

        items.privacy || (items.privacy = false)

        const createReadLaterModel = await readLaterModels.createReadLaterModel({ items })
        
        return {
            ...createReadLaterModel
        }
    }

    async deleteReadLaterService({ userId, bookId }, readLaterModels) {
        const deleteReadLaterModel = await readLaterModels.deleteReadLaterModel({ userId, bookId })

        return { 
            ...deleteReadLaterModel
        }
    }
}

export { ReadLaterServices }
