import { FollowsServices } from "../../services/users/followsServices.js"
 
class FollowsControllers {
    constructor () {
      this.followsServices = new FollowsServices()
    }

    getFollowsController(req, res) {
      const { id } = req.params

      const result = this.followsServices.getFollowsService()

      res.status(200).json({
          "status": "success",
          ...result
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
  