import { RemindersServices } from "../../services/users/remindersServices.js"

class RemindersControllers {
    constructor () {
      this.remindersServices = new RemindersServices()
    }

    getRemindersController = async (req, res) => {
      const { id } = req.params

      const result = await this.remindersServices.getRemindersService({id})

      res.status(200).json({
          "status": "success",
          ...result.queryCount,
          items: result.getRemindersService
      })
    }
  
    createReminderController(req, res) {
      const { id } = req.params
      const { name, description, reminder_time, is_active, is_sent } = req.body

      const result = this.remindersServices.createReminderService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    updateReminderController(req, res) {
      const { id, reminderId } = req.params
      const { name, description, reminder_time, is_active, is_sent } = req.body

      const result = this.remindersServices.updateReminderService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    deleteReminderController(req, res) {
      const { id, reminderId } = req.params

      const result = this.remindersServices.deleteReminderService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  }
  
  export { RemindersControllers }
  