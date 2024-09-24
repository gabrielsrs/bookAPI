import { UserBooksServices } from "../../services/users/userBooksServices.js"

class UserBooksControllers {
    constructor () {
      this.userBooksServices = new UserBooksServices()
    }

    getUserBooksController = async (req, res) => {
      const { id } = req.params

      const result = await this.userBooksServices.getUserBooksService({id})

      res.status(200).json({
          "status": "success",
          ...result.queryCount,
          items: result.getUserBooksModel
      })
    }
  
    addUserBookController(req, res) {
      const { id, bookId } = req.params

      const result = this.userBooksServices.addUserBookService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    removeUserBookController(req, res) {
      const { id, bookId } = req.params

      const result = this.userBooksServices.removeUserBookService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  }
  
  export { UserBooksControllers }
  