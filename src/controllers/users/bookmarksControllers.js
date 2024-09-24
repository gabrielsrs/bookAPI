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

  createBookmarksController (req, res) {
    const { id, bookId } = req.params
    const { privacy, book_locale } = req.body

    const result = this.bookmarksServices.createBookmarkService()

    res.status(200).json({
        "status": "success",
        ...result
    })
  }

  deleteBookmarksController (req, res) {
    const { id, bookId, bookmarkId } = req.params

    const result = this.bookmarksServices.deleteBookmarkService()

    res.status(200).json({
        "status": "success",
        ...result
    })
  }
}
  
export { BookmarksControllers }
