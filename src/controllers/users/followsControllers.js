import { FollowsServices } from "../../services/users/followsServices.js"
 
class FollowsControllers {
    constructor () {
      this.followsServices = new FollowsServices()
    }

    getFollowingController = async (req, res) => {
      const { id } = req.params

      const result = await this.followsServices.getFollowingService({id})

      res.status(200).json({
          "status": "success",
          ...result.queryCount,
          items: result.getFollowingModel
      })
    }
  
    getFollowerController = async (req, res) => {
      const { id } = req.params

      const result = await this.followsServices.getFollowerService({id})

      res.status(200).json({
          "status": "success",
          ...result.queryCount,
          items: result.getFollowerModel
      })
    }

    createFollowController(req, res) {
      const { id, userId } = req.params

      const result = this.followsServices.createFollowService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    deleteFollowController(req, res) {
      const { id, userId } = req.params

      const result = this.followsServices.deleteFollowService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  }
  
  export { FollowsControllers }
  