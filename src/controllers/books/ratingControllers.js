import { RatingServices } from "../../services/book/ratingServices.js"

class RatingControllers {
    getRatingsController (req, res) {
        const { id } = req.params

        const ratingServices = new RatingServices()

        const result = ratingServices.getRatingsService(id)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    createRatingsController (req, res) {
        const { id, userId } = req.params
        const { rating, privacy } = req.body

        const ratingServices = new RatingServices()

        const result = ratingServices.createRatingsService()

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    updateRatingsController (req, res) {
        const { id, userId, ratingId } = req.params
        const { rating, privacy } = req.body

        const ratingServices = new RatingServices()

        const result = ratingServices.updateRatingsService()

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    deleteRatingsController (req, res) {
        const { id, userId, ratingId } = req.params

        const ratingServices = new RatingServices()

        const result = ratingServices.deleteRatingsService()

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { RatingControllers }