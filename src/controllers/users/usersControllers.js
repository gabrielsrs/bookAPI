import { UsersServices } from "../../services/users/usersServices.js"
import { UsersModels } from "../../models/users/usersModels.js"

class UsersControllers {
    constructor () {
        this.usersServices = new UsersServices()
        this.usersModels = new UsersModels()
    }

    getUsersController = async (req, res) => {
        const { userId } = req.params

        const result = await this.usersServices.getUsersService({ userId }, this.usersModels)

        res.status(200).json({
            "status": "success",
            ...result.queryCount,
            "items": result.getUsersModel
        })
    }

    createUserController = async (req, res) => {
        const { nickname, description, cover_image } = req.body

        const result = await this.usersServices.createUserService({ nickname, description, cover_image }, this.usersModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    updateUserController = async (req, res) => {
        const { userId } = req.params
        const items = req.body

        const result = await this.usersServices.updateUserService({ userId, items }, this.usersModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    deleteUserController = async (req, res) => {
        const { userId } = req.params

        const result = await this.usersServices.deleteUserService({ userId }, this.usersModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { UsersControllers }
