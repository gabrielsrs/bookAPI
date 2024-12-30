import { ReadingServices } from "../../services/users/readingServices.js"
import { ReadingModels } from "../../models/users/readingModels.js"

class ReadingControllers {
    constructor () {
        this.readingServices = new ReadingServices()
        this.readingModels = new ReadingModels()
    }

    getReadingProgressController = async (req, res) => {
        const { id, bookId } = req.params

        const result = await this.readingServices.getReadingProgressService({ id, bookId }, this.readingModels)

        res.status(200).json({
            "status": "success",
            items: result.getReadingProgressService
        })
    }

    createReadingProgressController = async (req, res) => {
        const { id, bookId } = req.params
        const items = req.body

        const result = await this.readingServices.createReadingProgressService({ id, bookId, items }, this.readingModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    updateReadingProgressController = async (req, res) => {
        const { progressId } = req.params
        const items = req.body

        const result = await this.readingServices.updateReadingProgressService({ progressId, items }, this.readingModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    getReadingGoalsController = async (req, res) => {
        const { id, bookId } = req.params

        const result = await this.readingServices.getReadingGoalsService({ id, bookId }, this.readingModels)

        res.status(200).json({
            "status": "success",
            ...result.queryCount,
            items: result.getReadingGoalsService
        })
    }

    createReadingGoalController = async (req, res) => {
        const { id, bookId } = req.params
        const items = req.body

        const result = await this.readingServices.createReadingGoalService({ id, bookId, items }, this.readingModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    updateReadingGoalController = async (req, res) => {
        const { goalId } = req.params
        const items = req.body

        const result = await this.readingServices.updateReadingGoalService({ goalId, items }, this.readingModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    deleteReadingGoalController = async (req, res) => {
        const { goalId } = req.params

        const result = await this.readingServices.deleteReadingGoalService({ goalId }, this.readingModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { ReadingControllers }
