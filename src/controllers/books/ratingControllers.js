import { RatingServices } from "../../services/book/ratingServices.js"
import { RatingModels } from "../../models/books/ratingModels.js"

class RatingControllers {
    constructor () {
        this.ratingServices = new RatingServices()
        this.ratingModels = new RatingModels()
    }

    getRatingsController = async (req, res) => {
        const { bookId } = req.params

        const result = await this.ratingServices.getRatingsService({ bookId }, this.ratingModels)

        res.status(200).json({
            "status": "success",
            ...result.queryCount,
            items: result.getRatingsModel
        })
    }

    createRatingsController = async (req, res) => {
        const { bookId, userId } = req.params
        const items = req.body

        const result = await this.ratingServices.createRatingsService({ bookId, userId, items }, this.ratingModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    updateRatingsController = async (req, res) => {
        const { rateId } = req.params
        const items = req.body

        const result = await this.ratingServices.updateRatingsService({ rateId, items }, this.ratingModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    deleteRatingsController = async (req, res) => {
        const { rateId } = req.params

        const result = await this.ratingServices.deleteRatingsService({ rateId }, this.ratingModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { RatingControllers }