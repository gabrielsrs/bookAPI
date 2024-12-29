import { RatingModels } from "../../models/books/ratingModels.js"

import { ulid } from "ulid"

class RatingServices {
    constructor () {
        this.ratingModels = new RatingModels()
    }
    
    async getRatingsService ({id}) {
        const getRatingsModel = await this.ratingModels.getRatingsModel({id})
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
    }) {
        const rate_id = ulid()

        const createRatingsModel = await this.ratingModels.createRatingsModel({
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
    }) {
        const rateData = {}

        rating && (rateData.rating = rating)
        privacy && (rateData.privacy = privacy)

        const updateRatingsModel = await this.ratingModels.updateRatingsModel({
            ratingId,
            rateData
        })

        return {
            ...updateRatingsModel
        }
    }

    async deleteRatingsService ({ratingId}) {
        const deleteRatingsModel = await this.ratingModels.deleteRatingsModel({ratingId})

        return {
            ...deleteRatingsModel
        }
    }
}

export { RatingServices }