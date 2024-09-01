import { BookmarksServices } from "../../services/users/bookmarksServices.js"

class BookmarksControllers {
  constructor () {
    this.bookmarksServices = new BookmarksServices()
  }

  getBookmarksController (req, res) {
    const { id, bookId } = req.params

    const result = this.bookmarksServices.getBookmarksService()

    res.status(200).json({
        "status": "success",
        ...result
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
