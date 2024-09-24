import { UsersServices } from "../../services/users/usersServices.js"

class UsersControllers {
    constructor () {
      this.usersServices = new UsersServices()
    }

    getUsersController = async (req, res) => {
      const { id } = req.params

      const result = await this.usersServices.getUsersService({id})

      res.status(200).json({
          "status": "success",
          ...result.queryCount,
          "items": result.getUsersModel
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
  