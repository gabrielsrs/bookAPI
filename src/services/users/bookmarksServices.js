import { BookmarksModels } from "../../models/users/bookmarksModels.js"

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
  createBookmarkService (req, res) {
    // Logic for POST /:id/bookmarks/:bookId
  }

  deleteBookmarkService (req, res) {
    // Logic for DELETE /:id/bookmarks/:bookmarkId
  }
}

export { BookmarksServices }
  