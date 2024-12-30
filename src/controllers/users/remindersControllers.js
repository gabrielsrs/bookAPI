import { RemindersServices } from "../../services/users/remindersServices.js"
import { RemindersModels } from "../../models/users/remindersModels.js"

class RemindersControllers {
    constructor () {
        this.remindersServices = new RemindersServices()
        this.remindersModels = new RemindersModels()
    }

    getRemindersController = async (req, res) => {
        const { id } = req.params

        const result = await this.remindersServices.getRemindersService({ id }, this.remindersModels)

        res.status(200).json({
            "status": "success",
            ...result.queryCount,
            items: result.getRemindersService
        })
    }

    createReminderController = async (req, res) => {
        const { id } = req.params
        const items = req.body

        const result = await this.remindersServices.createReminderService({ id, items }, this.remindersModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    updateReminderController = async (req, res) => {
        const { reminderId } = req.params
        const items = req.body

        const result = await this.remindersServices.updateReminderService({ reminderId, items }, this.remindersModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    deleteReminderController = async (req, res) => {
        const { reminderId } = req.params

        const result = await this.remindersServices.deleteReminderService({ reminderId }, this.remindersModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { RemindersControllers }
