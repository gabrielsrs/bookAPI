import { RatingServices } from "../../services/book/ratingServices.js"

class RatingControllers {
    constructor () {
        this.ratingServices = new RatingServices()
    }

    getRatingsController (req, res) {
        const { id } = req.params

        const result = this.ratingServices.getRatingsService(id)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    createRatingsController (req, res) {
        const { id, userId } = req.params
        const { rating, privacy } = req.body

        const result = this.ratingServices.createRatingsService()

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    updateRatingsController (req, res) {
        const { id, userId, ratingId } = req.params
        const { rating, privacy } = req.body

        const result = this.ratingServices.updateRatingsService()

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    deleteRatingsController (req, res) {
        const { id, userId, ratingId } = req.params

        const result = this.ratingServices.deleteRatingsService()

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { RatingControllers }