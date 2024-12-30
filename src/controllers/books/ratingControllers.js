import { RatingServices } from "../../services/book/ratingServices.js"
import { RatingModels } from "../../models/books/ratingModels.js"

class RatingControllers {
    constructor () {
        this.ratingServices = new RatingServices()
        this.ratingModels = new RatingModels()
    }

    getRatingsController = async (req, res) => {
        const { id } = req.params

        const result = await this.ratingServices.getRatingsService({ id }, this.ratingModels)

        res.status(200).json({
            "status": "success",
            ...result.queryCount,
            items: result.getRatingsModel
        })
    }

    createRatingsController = async (req, res) => {
        const { id, userId } = req.params
        const { rating, privacy } = req.body

        const result = await this.ratingServices.createRatingsService({
            id,
            userId,
            rating,
            privacy
        }, this.ratingModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    updateRatingsController = async (req, res) => {
        const { ratingId } = req.params
        const { rating, privacy } = req.body

        const result = await this.ratingServices.updateRatingsService({
            ratingId,
            rating,
            privacy
        }, this.ratingModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    deleteRatingsController = async (req, res) => {
        const { ratingId } = req.params

        const result = await this.ratingServices.deleteRatingsService({ ratingId }, this.ratingModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { RatingControllers }