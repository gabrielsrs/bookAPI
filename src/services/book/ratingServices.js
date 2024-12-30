import { ulid } from "ulid"

class RatingServices {
    async getRatingsService ({ id }, ratingModels) {
        const getRatingsModel = await ratingModels.getRatingsModel({ id })
        const queryCount = {
            count: getRatingsModel.length
        }

        return {
            getRatingsModel,
            queryCount
        }
    }

    async createRatingsService ({
        id,
        userId,
        rating,
        privacy = false
    }, ratingModels) {
        const rate_id = ulid()

        const createRatingsModel = await ratingModels.createRatingsModel({
            rate_id,
            id,
            userId,
            rating,
            privacy
        })

        return {
            ...createRatingsModel
        }
    }

    async updateRatingsService ({
        ratingId,
        rating,
        privacy
    }, ratingModels) {
        const rateData = {}

        rating && (rateData.rating = rating)
        privacy && (rateData.privacy = privacy)

        const updateRatingsModel = await ratingModels.updateRatingsModel({
            ratingId,
            rateData
        })

        return {
            ...updateRatingsModel
        }
    }

    async deleteRatingsService ({ ratingId }, ratingModels) {
        const deleteRatingsModel = await ratingModels.deleteRatingsModel({ ratingId })

        return {
            ...deleteRatingsModel
        }
    }
}

export { RatingServices }