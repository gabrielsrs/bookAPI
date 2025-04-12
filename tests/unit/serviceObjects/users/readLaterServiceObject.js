class ReadLaterServiceObject {
    getReadLaterModel({ userId, }) {
        return {
            readLater: [],
            userId
        }
    }

    createReadLaterModel({ userId, bookId, items }) {
        return { userId, bookId, items }
    }

    deleteReadLaterModel({ userId, bookId }) {
        return { userId, bookId }
    }
}

export { ReadLaterServiceObject }