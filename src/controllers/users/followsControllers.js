import { FollowsServices } from "../../services/users/followsServices.js"
 
class FollowsControllers {
    constructor () {
      this.followsServices = new FollowsServices()
    }

    getFollowsController = async (req, res) => {
      const { id } = req.params

      const result = await this.followsServices.getFollowsService({id})

      res.status(200).json({
          "status": "success",
          ...result.queryCount,
          items: result.getFollowsModel
      })
    }


    createFollowController = async (req, res) => {
      const { id, userId } = req.params

      const result = await this.followsServices.createFollowService({ id, userId })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    deleteFollowController = async (req, res) => {
      const { id, userId } = req.params

      const result = await this.followsServices.deleteFollowService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  }
  
  export { FollowsControllers }
  