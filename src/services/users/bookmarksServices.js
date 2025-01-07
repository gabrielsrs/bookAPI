import { ulid } from "ulid"

class BookmarksServices {
  async getBookmarksService({ userId, bookId }, bookmarksModels) {
    let getBookmarksModel = null

    if (bookId) {
      getBookmarksModel = await bookmarksModels.getBookBookmarksModel({ userId, bookId })
      
    } else {
      getBookmarksModel = await bookmarksModels.getBooksBookmarksModel({ userId })
    }

    return {
      count: getBookmarksModel.bookmarks.length,
      ...getBookmarksModel,
    }
  }

  async createBookmarkService ({ userId, bookId, items }, bookmarksModels) {
    items.bookmarkId = ulid()
    items.userId = userId
    items.bookId = bookId

    items.privacy || (items.privacy = true)
    
    const { book_locale: bookLocale } = items

    bookLocale.bookLocaleId = ulid()

    const createBookmarkModel = await bookmarksModels.createBookmarkModel({ items, bookLocale })

    return createBookmarkModel
  }

  async deleteBookmarkService ({ bookmarkId }, bookmarksModels) {
    const deleteBookmarkModel = await bookmarksModels.deleteBookmarkModel({ bookmarkId })

    return deleteBookmarkModel
  }
}

export { BookmarksServices }
