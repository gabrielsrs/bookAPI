import { FollowsServices } from "../../services/users/followsServices.js"
import { FollowsModels } from "../../models/users/followsModels.js"

class FollowsControllers {
    constructor () {
        this.followsServices = new FollowsServices()
        this.followsModels = new FollowsModels()
    }

    getFollowsController = async (req, res) => {
        const { id } = req.params

        const result = await this.followsServices.getFollowsService({ id }, this.followsModels)

        res.status(200).json({
            "status": "success",
            ...result.queryCount,
            items: result.getFollowsModel
        })
    }

    createFollowController = async (req, res) => {
        const { id, userId } = req.params

        const result = await this.followsServices.createFollowService({ id, userId }, this.followsModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    deleteFollowController = async (req, res) => {
        const { id, userId } = req.params

        const result = await this.followsServices.deleteFollowService({ id, userId }, this.followsModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { FollowsControllers }
