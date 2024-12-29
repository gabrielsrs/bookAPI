import { ReadingModels } from "../../models/users/readingModels.js"

import { ulid } from 'ulid'
import dayjs from "dayjs"

class ReadingServices {
    constructor() {
      this.readingModels = new ReadingModels()
    }

    async getReadingProgressService({id, bookId}) {
      const getReadingProgressModel = await this.readingModels.getReadingProgressModel({id, bookId})

      return {
        getReadingProgressService: getReadingProgressModel
      }
    }
  
    async createReadingProgressService({ id:userId, bookId, items }) {
      items.id = ulid()
      items.privacy || (items.privacy = false)
      items.started || (items.started = false)
      items.finished || (items.finished = false)
      items.lastReading = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")

      const { book_locale: bookLocale } = items
      bookLocale.id = ulid()

      const createReadingProgressModel = await this.readingModels.createReadingProgressModel({ userId, bookId, items, bookLocale })

      return {
        ...createReadingProgressModel
      }
    }
  
    async updateReadingProgressService({ progressId, items }) {
      const { book_locale: bookLocale } = items
      delete items.book_locale

      bookLocale && (items.lastReading = dayjs().format("YYYY-MM-DD[T]HH:mm:ss"))
      
      const updateReadingProgressModel = await this.readingModels.updateReadingProgressModel({ progressId, items, bookLocale })

      return {
        ...updateReadingProgressModel
      }
    }
  
    async getReadingGoalsService({id, bookId}) {
      const getReadingGoalsModel = await this.readingModels.getReadingGoalsModel({id, bookId})
      const queryCount = {
        count: getReadingGoalsModel.length
      }
      
      return {
        getReadingGoalsService: getReadingGoalsModel,
        queryCount
      }
    }
  
    async createReadingGoalService({ id:userId, bookId, items }) {
      const { start_time:startTime, end_date:endDate, frequency } = items

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

      // const createReadingGoalModel = await this.readingModels.createReadingGoalModel({ userId, bookId, items, frequency, reminder })
      
      return items
      return {
        ...createReadingGoalModel
      }
    }
  
    async updateReadingGoalService({ goalId, items }) {
      const { start_time:startTime, end_date:endDate, frequency } = items
      const reminder = {}
      delete items.frequency

      startTime && (items.start_time = dayjs(startTime).format("HH:mm:ss"))
      endDate && (items.end_date = dayjs(endDate).format("YYYY-MM-DD"))

      Object.entries(items).filter(item => item[0] !== frequency) && (items.updated_at = dayjs().format("YYYY-MM-DD[T]HH:mm:ss"))

      if (startTime) {
        reminder.reminder_time = dayjs(items.startTime).subtract(5, 'm'),
        reminder.updated_at = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")
      }

      const updateReadingGoalModel = await this.readingModels.updateReadingGoalModel({ goalId, items, frequency, reminder })

      return {
        ...updateReadingGoalModel
      }
    }
  
    async deleteReadingGoalService({ goalId }) {
      const deleteReadingGoalModel = await this.readingModels.deleteReadingGoalModel({ goalId })

      return {
        ...deleteReadingGoalModel
      }
    }
  }
  
  export { ReadingServices };
  