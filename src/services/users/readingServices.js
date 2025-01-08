import { ulid } from 'ulid'
import dayjs from "dayjs"

class ReadingServices {
    async getReadingProgressService({ userId, bookId }, readingModels) {
        const getReadingProgressModel = await readingModels.getReadingProgressModel({ userId, bookId })

        return getReadingProgressModel
    }

    async createReadingProgressService({ userId, bookId, items }, readingModels) {
        items.readingProgressId = ulid()
        "privacy" in items || (items.privacy = false)
        "started" in items || (items.started = false)
        "finished" in items || (items.finished = false)
        items.lastReading = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")

        const { book_locale: bookLocale } = items
        bookLocale.bookLocaleId = ulid()

        const createReadingProgressModel = await readingModels.createReadingProgressModel({ userId, bookId, items, bookLocale })

        return createReadingProgressModel
    }

    async updateReadingProgressService({ progressId, items }, readingModels) {
        const { book_locale: bookLocale } = items
        delete items.book_locale

        bookLocale && (items.last_reading = dayjs().format("YYYY-MM-DD[T]HH:mm:ss"))
        
        const updateReadingProgressModel = await readingModels.updateReadingProgressModel({ progressId, items, bookLocale })

        return updateReadingProgressModel
    }

    async getReadingGoalsService({ userId, bookId }, readingModels) {
        const getReadingGoalsModel = await readingModels.getReadingGoalsModel({ userId, bookId })
        
        return {
            count: getReadingGoalsModel.goals.length,
            ...getReadingGoalsModel
        }
    }

    async createReadingGoalService({ userId, bookId, items }, readingModels) {
        const { start_time: startTime, end_date: endDate, frequency } = items
        const date = dayjs().format("YYYY-MM-DD") + "T"

        items.goalId = ulid()
        items.endDate = dayjs(endDate).format("YYYY-MM-DD")
        items.startTime = dayjs(date + startTime).format("HH:mm:ss")
        items.goalUpdatedAt = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")

        frequency.frequencyId = ulid()

        const reminder = {
            reminderId: ulid(),
            reminderTime: dayjs(date + startTime).subtract(5, 'm').format("HH:mm:ss"),
            isActive: true,
            isSent : false,
            reminderUpdatedAt: dayjs().format("YYYY-MM-DD[T]HH:mm:ss")
        }

        const createReadingGoalModel = await readingModels.createReadingGoalModel({ userId, bookId, items, frequency, reminder })
        
        return createReadingGoalModel
    }

    async updateReadingGoalService({ goalId, items }, readingModels) {
        const { start_time: startTime, end_date: endDate, frequency } = items
        const reminder = {}
        let date

        delete items.frequency

        if(startTime) {
            date = dayjs().format("YYYY-MM-DD") + "T"
            items.start_time = dayjs(date + startTime).format("HH:mm:ss")
        }

        endDate && (items.end_date = dayjs(endDate).format("YYYY-MM-DD"))

        Object.entries(items).length && (items.updated_at = dayjs().format("YYYY-MM-DD[T]HH:mm:ss"))

        if (startTime) {
            reminder.reminder_time = dayjs(date + items.start_time).subtract(5, 'm').format("HH:mm:ss"),
            reminder.updated_at = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")
        }

        const updateReadingGoalModel = await readingModels.updateReadingGoalModel({ goalId, items, frequency, reminder })

        return updateReadingGoalModel
    }

    async deleteReadingGoalService({ goalId }, readingModels) {
        const deleteReadingGoalModel = await readingModels.deleteReadingGoalModel({ goalId })

        return deleteReadingGoalModel
    }
}

export { ReadingServices }
