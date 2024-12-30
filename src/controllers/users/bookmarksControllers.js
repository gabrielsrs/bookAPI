import { BookmarksServices } from "../../services/users/bookmarksServices.js"
import { BookmarksModels } from "../../models/users/bookmarksModels.js"

class BookmarksControllers {
  constructor () {
    this.bookmarksServices = new BookmarksServices()
    this.bookmarksModels = new BookmarksModels()
  }

  getBookmarksController = async (req, res) => {
    const { userId, bookId } = req.params

    const result = await this.bookmarksServices.getBookmarksService({ userId, bookId }, this.bookmarksModels)

    res.status(200).json({
        "status": "success",
        ...result.queryCount,
        items: result.getBookmarksModel
    })
  }

  createBookmarksController = async (req, res) => {
    const { userId, bookId } = req.params
    const items = req.body

    const result = await this.bookmarksServices.createBookmarkService({ userId, bookId, items }, this.bookmarksModels)

    res.status(200).json({
        "status": "success",
        ...result
    })
  }

  deleteBookmarksController = async (req, res) => {
    const { bookmarkId } = req.params

    const result = await this.bookmarksServices.deleteBookmarkService({ bookmarkId }, this.bookmarksModels)

    res.status(200).json({
        "status": "success",
        ...result
    })
  }
}

export { BookmarksControllers }
