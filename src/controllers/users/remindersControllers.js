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
  
    createReminderController = async (req, res) => {
      const { id } = req.params
      const items = req.body

      const result = await this.remindersServices.createReminderService({ id, items })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    updateReminderController = async (req, res) => {
      const { reminderId } = req.params
      const items = req.body

      const result = await this.remindersServices.updateReminderService({ reminderId, items })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    deleteReminderController = async (req, res) => {
      const { reminderId } = req.params

      const result = await this.remindersServices.deleteReminderService({ reminderId })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  }
  
  export { RemindersControllers }
  