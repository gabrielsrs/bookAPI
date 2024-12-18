import { BookmarksServices } from "../../services/users/bookmarksServices.js"

class BookmarksControllers {
  constructor () {
    this.bookmarksServices = new BookmarksServices()
  }

  getBookmarksController = async (req, res) => {
    const { id, bookId } = req.params

    const result = await this.bookmarksServices.getBookmarksService({id, bookId})

    res.status(200).json({
        "status": "success",
        ...result.queryCount,
        items: result.getBookmarksModel
    })
  }

  createBookmarksController = async (req, res) => {
    const { id, bookId } = req.params
    const items = req.body

    const result = await this.bookmarksServices.createBookmarkService({ id, bookId, items })

    res.status(200).json({
        "status": "success",
        ...result
    })
  }

  deleteBookmarksController = async (req, res) => {
    const { bookmarkId } = req.params

    const result = await this.bookmarksServices.deleteBookmarkService({ bookmarkId })

    res.status(200).json({
        "status": "success",
        ...result
    })
  }
}
  
export { BookmarksControllers }
