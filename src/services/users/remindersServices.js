import { ulid } from 'ulid'
import dayjs from "dayjs"

class RemindersServices {
  async getRemindersService({ id }, remindersModels) {
    const getRemindersModel = await remindersModels.getRemindersModel({ id })
    const queryCount = {
      count: getRemindersModel.length
    }

    return {
      getRemindersService: getRemindersModel,
      queryCount
    }
  }

  async createReminderService({ id: userId, items }, remindersModels) {
    items.id = ulid()
    items.reminderDate = dayjs(items.reminder_datetime).format("YYYY-MM-DD")
    items.reminderTime = dayjs(items.reminder_datetime).format("HH:mm:ss")
    items.is_active || (items.is_active = true)
    items.is_sent || (items.is_sent = false)
    items.updatedAt = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")

    const createReminderModel = await remindersModels.createReminderModel({ userId, items })

    return {
      ...createReminderModel
    }
  }

  async updateReminderService({ reminderId, items }, remindersModels) {
    items.reminder_datetime && (
      items.reminder_date = dayjs(items.reminder_datetime).format("YYYY-MM-DD"),
      items.reminder_time = dayjs(items.reminder_datetime).format("HH:mm:ss")
    )
    items.updated_at = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")

    const updateReminderModel = await remindersModels.updateReminderModel({ reminderId, items })

    return {
      ...updateReminderModel
    }
  }

  async deleteReminderService({ reminderId }, remindersModels) {
    const deleteReminderModel = await remindersModels.deleteReminderModel({ reminderId })

    return {
      ...deleteReminderModel
    }
  }
}

export { RemindersServices }
