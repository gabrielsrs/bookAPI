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
  
    addUserBookController = async (req, res) => {
      const { id, bookId } = req.params

      const result = await this.userBooksServices.addUserBookService({ id, bookId })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    removeUserBookController = async (req, res) => {
      const { id, bookId } = req.params

      const result = await this.userBooksServices.removeUserBookService({ id, bookId })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  }
  
  export { UserBooksControllers }
  