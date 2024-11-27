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
  
    createUserController = async (req, res) => {
      const { nickname, description, cover_image } = req.body

      const result = await this.usersServices.createUserService({nickname, description, cover_image})

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    updateUserController = async (req, res) => {
      const { id } = req.params
      const items = req.body

      const result = await this.usersServices.updateUserService({id, items})

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    deleteUserController = async (req, res) => {
      const { id } = req.params

      const result = await this.usersServices.deleteUserService({id})

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  }
  
  export { UsersControllers }
  