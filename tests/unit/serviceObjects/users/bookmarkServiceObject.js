class BookmarkServiceObject {
    getBookBookmarksModel({ bookId, userId }) {
        return {
            bookmarks: [],
            bookId,
            userId
        }
    }

    getBooksBookmarksModel({ userId }) {
        return {
            bookmarks: [],
            userId
        }
    }

    createBookmarkModel({ items, bookLocale }) {
        return { items, bookLocale }
    }

    deleteBookmarkModel({ bookmarkId }) {
        return { bookmarkId }
    }
}

export { BookmarkServiceObject }