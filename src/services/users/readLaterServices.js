import { ulid } from 'ulid'
import dayjs from "dayjs"

class ReadLaterServices {
    async getReadLaterService({ userId }, readLaterModels) {
        const getReadLetterModel = await readLaterModels.getReadLaterModel({ userId })

        return {
            count: getReadLetterModel.readLater.length,
            ...getReadLetterModel
        }
    }

    async createReadLaterService({ userId, bookId, items }, readLaterModels) {
        items.readLaterId = ulid()
        items.updatedAt = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")

        "privacy" in items || (items.privacy = false)

        const createReadLaterModel = await readLaterModels.createReadLaterModel({ userId, bookId, items })
        
        return createReadLaterModel
    }

    async deleteReadLaterService({ userId, bookId }, readLaterModels) {
        const deleteReadLaterModel = await readLaterModels.deleteReadLaterModel({ userId, bookId })

        return deleteReadLaterModel
    }
}

export { ReadLaterServices }
