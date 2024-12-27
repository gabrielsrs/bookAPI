import { RemindersModels } from "../../models/users/remindersModels.js"

import { ulid } from 'ulid'
import dayjs from "dayjs"

class RemindersServices {
  constructor() {
    this.remindersModels = new RemindersModels()
  }

  async getRemindersService({id}) {
    const getRemindersModel = await this.remindersModels.getRemindersModel({id})
    const queryCount = {
      count: getRemindersModel.length
    }

    return {
      getRemindersService: getRemindersModel,
      queryCount
    }
  }

  async createReminderService({ id:userId, items }) {
    items.id = ulid()
    items.reminderDate = dayjs(items.reminder_datetime).format("YYYY-DD-MM")
    items.reminderTime = dayjs(items.reminder_datetime).format("HH:mm:ss")
    items.is_active || (items.is_active = true)
    items.is_sent || (items.is_sent = false)
    items.updatedAt = dayjs().format("YYYY-DD-MM[T]HH:mm:ss")

    const createReminderModel = await this.remindersModels.createReminderModel({ userId, items })

    return {
      ...createReminderModel
    }
  }

  async updateReminderService({ reminderId, items }) {
    items.reminder_datetime && (
      items.reminder_date = dayjs(items.reminder_datetime).format("YYYY-DD-MM"),
      items.reminder_time = dayjs(items.reminder_datetime).format("HH:mm:ss")
    )
    items.updatedAt = dayjs().format("YYYY-DD-MM[T]HH:mm:ss")

    const updateReminderModel = await this.remindersModels.updateReminderModel({ reminderId, items })

    return {
      ...updateReminderModel
    }
  }

  async deleteReminderService({ reminderId }) {
    const deleteReminderModel = await this.remindersModels.deleteReminderModel({ reminderId })

    return {
      ...deleteReminderModel
    }
  }
}

export { RemindersServices };
  