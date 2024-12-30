import { ulid } from "ulid"

class RatingServices {
    async getRatingsService ({ bookId }, ratingModels) {
        const getRatingsModel = await ratingModels.getRatingsModel({ bookId })
        const queryCount = {
            count: getRatingsModel.length
        }

        return {
            getRatingsModel,
            queryCount
        }
    }

    async createRatingsService ({
        bookId,
        userId,
        rating,
        privacy = false
    }, ratingModels) {
        const rateId = ulid()

        const createRatingsModel = await ratingModels.createRatingsModel({
            rateId,
            bookId,
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