class ReadingServiceObject {
    getReadingProgressModel({ userId, bookId }) {
        return { userId, bookId }
    }

    createReadingProgressModel({ userId, bookId, items, bookLocale }) {
        return { userId, bookId, items, bookLocale }
    }

    updateReadingProgressModel({ progressId, items, bookLocale }) {
        return { progressId, items, bookLocale }
    }

    getReadingGoalsModel({ userId, bookId }) {
        return {
            goals: [],
            userId, 
            bookId
        }
    }

    createReadingGoalModel({ userId, bookId, items, frequency, reminder }) {
        return { userId, bookId, items, frequency, reminder }
    }

    updateReadingGoalModel({ goalId, items, frequency, reminder }) {
        return { goalId, items, frequency, reminder }
    }

    deleteReadingGoalModel({ goalId }) {
        return { goalId }
    }
}

export { ReadingServiceObject }