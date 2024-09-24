import { RatingModels } from "../../models/books/ratingModels.js"

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

    createRatingsService () {
        
    }

    updateRatingsService () {
        
    }

    deleteRatingsService () {
        
    }
}

export { RatingServices }