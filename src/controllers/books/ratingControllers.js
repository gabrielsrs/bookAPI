import { RatingServices } from "../../services/book/ratingServices.js"

class RatingControllers {
    constructor () {
        this.ratingServices = new RatingServices()
    }

    getRatingsController = async (req, res) => {
        const { id } = req.params

        const result = await this.ratingServices.getRatingsService({id})

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
        })

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
        })

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    deleteRatingsController = async (req, res) => {
        const { ratingId } = req.params

        const result = await this.ratingServices.deleteRatingsService({ratingId})

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { RatingControllers }