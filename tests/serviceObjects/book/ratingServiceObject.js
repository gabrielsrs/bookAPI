class RatingServiceObject {
    getRatingsModel({ bookId }) {
        return {
            ratings: [],
            bookId
        }
    }

    createRatingsModel({
        bookId,
        userId,
        items
    }) {
        return {
            bookId,
            userId,
            items
        }
    }

    updateRatingsModel({
        rateId,
        items
    }) {
        return {
            rateId,
            items
        }
    }

    deleteRatingsModel({ rateId }) {
        return {
            rate: [],
            rateId
        }
    }
}

export { RatingServiceObject }