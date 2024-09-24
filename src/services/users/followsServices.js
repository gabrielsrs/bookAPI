import { FollowsModels } from "../../models/users/followsModels.js"

class FollowsServices {
    constructor () {
      this.followsModels = new FollowsModels()
    }

    async getFollowingService ({id}) {
      const getFollowingModel = await this.followsModels.getFollowingModel({id})
      const queryCount = {
        count: getFollowingModel.length
      }

      return {
        getFollowingModel,
        queryCount
      }
    }

    async getFollowerService ({id}) {
      const getFollowerModel = await this.followsModels.getFollowerModel({id})
      const queryCount = {
        count: getFollowerModel.length
      }

      return {
        getFollowerModel,
        queryCount
      }
    }
  
    createFollowService(req, res) {
      // Logic for POST /:id/follow/:userId
    }
  
    deleteFollowService(req, res) {
      // Logic for DELETE /:id/unfollow/:userId
    }
  }
  
  export { FollowsServices };
  