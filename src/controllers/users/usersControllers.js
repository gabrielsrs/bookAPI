import { UsersServices } from "../../services/users/usersServices.js"
import { UsersModels } from "../../models/users/usersModels.js"

class UsersControllers {
    constructor () {
        this.usersServices = new UsersServices()
        this.usersModels = new UsersModels()
    }

    getUsersController = async (req, res) => {
        const { id } = req.params

        const result = await this.usersServices.getUsersService({ id }, this.usersModels)

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
        const { id } = req.params
        const items = req.body

        const result = await this.usersServices.updateUserService({ id, items }, this.usersModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    deleteUserController = async (req, res) => {
        const { id } = req.params

        const result = await this.usersServices.deleteUserService({ id }, this.usersModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { UsersControllers }
