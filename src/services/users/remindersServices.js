import { RemindersModels } from "../../models/users/remindersModels.js"

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

  createReminderService(req, res) {
    // Logic for POST /:id/reminders
  }

  updateReminderService(req, res) {
    // Logic for PATCH /:id/reminders/:reminderId
  }

  deleteReminderService(req, res) {
    // Logic for DELETE /:id/reminders/:reminderId
  }
}

export { RemindersServices };
  