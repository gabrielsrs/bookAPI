import { FollowsServices } from "../../services/users/followsServices.js"
import { FollowsModels } from "../../models/users/followsModels.js"

class FollowsControllers {
    constructor () {
        this.followsServices = new FollowsServices()
        this.followsModels = new FollowsModels()
    }

    getFollowsController = async (req, res) => {
        const { userId } = req.params

        const result = await this.followsServices.getFollowsService({ userId }, this.followsModels)

        res.status(200).json({
            "status": "success",
            ...result.queryCount,
            items: result.getFollowsModel
        })
    }

    createFollowController = async (req, res) => {
        const { userId, follow } = req.params

        const result = await this.followsServices.createFollowService({ userId, follow }, this.followsModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    deleteFollowController = async (req, res) => {
        const { userId, follow } = req.params

        const result = await this.followsServices.deleteFollowService({ userId, follow }, this.followsModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { FollowsControllers }
