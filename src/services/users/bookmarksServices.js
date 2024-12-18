import { BookmarksModels } from "../../models/users/bookmarksModels.js"

import { ulid } from 'ulid'

class BookmarksServices {
  constructor () {
    this.bookmarksModels = new BookmarksModels()
  }

  async getBookmarksService({id, bookId}) {
    let getBookmarksModel = null

    if (bookId) {
      getBookmarksModel = await this.bookmarksModels.getBookBookmarksModel({id, bookId})
    } else {
      getBookmarksModel = await this.bookmarksModels.getBooksBookmarksModel({id})
    }

    const queryCount = {
      count: getBookmarksModel.length
    }

    return {
      getBookmarksModel,
      queryCount
    }
  }
  async createBookmarkService ({ id, bookId, items }) {
    items.id = ulid()
    items.userId = id
    items.bookId = bookId

    items.privacy || (items.privacy = true)
    
    const { book_locale: bookLocale } = items

    bookLocale.id = ulid()

    const createBookmarkModel = await this.bookmarksModels.createBookmarkModel({ items, bookLocale })

    return {
      ...createBookmarkModel
    }

  }

  async deleteBookmarkService ({ bookmarkId }) {
    const deleteBookmarkModel = await this.bookmarksModels.deleteBookmarkModel({ bookmarkId })

    return {
      ...deleteBookmarkModel
    }
  }
}

export { BookmarksServices }
  