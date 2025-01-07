import { ulid } from "ulid"

class RatingServices {
    async getRatingsService ({ bookId }, ratingModels) {
        const getRatingsModel = await ratingModels.getRatingsModel({ bookId })

        return {
            count: getRatingsModel.ratings.length,
            ...getRatingsModel,
        }
    }

    async createRatingsService ({ bookId, userId, items }, ratingModels) {
        items.rateId = ulid()

        "privacy" in items || (items.privacy = false)

        const createRatingsModel = await ratingModels.createRatingsModel({ bookId, userId, items })

        return createRatingsModel
    }

    async updateRatingsService ({ rateId, items }, ratingModels) {
        const updateRatingsModel = await ratingModels.updateRatingsModel({ rateId, items })

        return updateRatingsModel
    }

    async deleteRatingsService ({ rateId }, ratingModels) {
        const deleteRatingsModel = await ratingModels.deleteRatingsModel({ rateId })

        return deleteRatingsModel
    }
}

export { RatingServices }