import { UsersServices } from "../../services/users/usersServices.js"

class UsersControllers {
    constructor () {
      this.usersServices = new UsersServices()
    }

    getUsersController (req, res) {
      const { id } = req.params

      const result = this.usersServices.getUsersService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    createUserController (req, res) {
      const { nickname, description, cover_image } = req.body

      const result = this.usersServices.createUserService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    updateUserController (req, res) {
      const { id } = req.params
      const { nickname, description, cover_image } = req.body

      const result = this.usersServices.updateUserService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    deleteUserController (req, res) {
      const { id } = req.params

      const result = this.usersServices.deleteUserService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  }
  
  export { UsersControllers }
  