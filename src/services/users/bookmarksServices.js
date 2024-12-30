import { ulid } from 'ulid'

class BookmarksServices {
  async getBookmarksService({ id, bookId }, bookmarksModels) {
    let getBookmarksModel = null

    if (bookId) {
      getBookmarksModel = await bookmarksModels.getBookBookmarksModel({ id, bookId })
    } else {
      getBookmarksModel = await bookmarksModels.getBooksBookmarksModel({ id })
    }

    const queryCount = {
      count: getBookmarksModel.length
    }

    return {
      getBookmarksModel,
      queryCount
    }
  }

  async createBookmarkService ({ id, bookId, items }, bookmarksModels) {
    items.id = ulid()
    items.userId = id
    items.bookId = bookId

    items.privacy || (items.privacy = true)
    
    const { book_locale: bookLocale } = items

    bookLocale.id = ulid()

    const createBookmarkModel = await bookmarksModels.createBookmarkModel({ items, bookLocale })

    return {
      ...createBookmarkModel
    }
  }

  async deleteBookmarkService ({ bookmarkId }, bookmarksModels) {
    const deleteBookmarkModel = await bookmarksModels.deleteBookmarkModel({ bookmarkId })

    return {
      ...deleteBookmarkModel
    }
  }
}

export { BookmarksServices }
