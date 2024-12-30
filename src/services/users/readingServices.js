import { ulid } from 'ulid'
import dayjs from "dayjs"

class ReadingServices {
    async getReadingProgressService({ userId, bookId }, readingModels) {
        const getReadingProgressModel = await readingModels.getReadingProgressModel({ userId, bookId })

        return {
            getReadingProgressService: getReadingProgressModel
        }
    }

    async createReadingProgressService({ userId, bookId, items }, readingModels) {
        items.readingProgressId = ulid()
        items.privacy || (items.privacy = false)
        items.started || (items.started = false)
        items.finished || (items.finished = false)
        items.lastReading = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")

        const { book_locale: bookLocale } = items
        bookLocale.bookLocaleId = ulid()

        const createReadingProgressModel = await readingModels.createReadingProgressModel({ userId, bookId, items, bookLocale })

        return {
            ...createReadingProgressModel
        }
    }

    async updateReadingProgressService({ progressId, items }, readingModels) {
        const { book_locale: bookLocale } = items
        delete items.book_locale

        bookLocale && (items.lastReading = dayjs().format("YYYY-MM-DD[T]HH:mm:ss"))
        
        const updateReadingProgressModel = await readingModels.updateReadingProgressModel({ progressId, items, bookLocale })

        return {
            ...updateReadingProgressModel
        }
    }

    async getReadingGoalsService({ userId, bookId }, readingModels) {
        const getReadingGoalsModel = await readingModels.getReadingGoalsModel({ userId, bookId })
        const queryCount = {
            count: getReadingGoalsModel.length
        }
        
        return {
            getReadingGoalsService: getReadingGoalsModel,
            queryCount
        }
    }

    async createReadingGoalService({ userId, bookId, items }, readingModels) {
        const { start_time: startTime, end_date: endDate, frequency } = items

        items.goalId = ulid()
        items.startTime = dayjs(`${endDate}T${startTime}`).format("HH:mm:ss")
        items.endDate = dayjs(endDate).format("YYYY-MM-DD")
        items.goalUpdatedAt = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")

        frequency.frequencyId = ulid()

        const reminder = {
            reminderId: ulid(),
            reminderTime: dayjs(items.startTime).subtract(5, 'm'),
            isActive: true,
            isSent : false,
            reminderUpdatedAt: dayjs().format("YYYY-MM-DD[T]HH:mm:ss")
        }

        const createReadingGoalModel = await readingModels.createReadingGoalModel({ userId, bookId, items, frequency, reminder })
        
        return {
            ...createReadingGoalModel
        }
    }

    async updateReadingGoalService({ goalId, items }, readingModels) {
        const { start_time: startTime, end_date: endDate, frequency } = items
        const reminder = {}
        delete items.frequency

        startTime && (items.start_time = dayjs(startTime).format("HH:mm:ss"))
        endDate && (items.end_date = dayjs(endDate).format("YYYY-MM-DD"))

        Object.entries(items).filter(item => item[0] !== frequency) && (items.updated_at = dayjs().format("YYYY-MM-DD[T]HH:mm:ss"))

        if (startTime) {
            reminder.reminder_time = dayjs(items.startTime).subtract(5, 'm'),
            reminder.updated_at = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")
        }

        const updateReadingGoalModel = await readingModels.updateReadingGoalModel({ goalId, items, frequency, reminder })

        return {
            ...updateReadingGoalModel
        }
    }

    async deleteReadingGoalService({ goalId }, readingModels) {
        const deleteReadingGoalModel = await readingModels.deleteReadingGoalModel({ goalId })

        return {
            ...deleteReadingGoalModel
        }
    }
}

export { ReadingServices }
