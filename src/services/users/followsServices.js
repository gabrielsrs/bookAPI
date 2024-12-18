import { FollowsModels } from "../../models/users/followsModels.js"

import { ulid } from 'ulid'

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
  
    async createFollowService({ id: follow, userId:followed }) {
      const id = ulid()

      const createFollowModel = await this.followsModels.createFollowModel({ id, follow, followed })

      return {
        ...createFollowModel
      }
    }
  
    async deleteFollowService({ id: unfollow, userId:unfollowed }) {
      const deleteFollowModel = await this.followsModels.deleteFollowModel({ unfollow, unfollowed })

      return {
        ...deleteFollowModel
      }
    }
  }
  
  export { FollowsServices };
  