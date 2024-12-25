import { FollowsModels } from "../../models/users/followsModels.js"

import { ulid } from 'ulid'

class FollowsServices {
    constructor () {
      this.followsModels = new FollowsModels()
    }

    async getFollowsModel ({id}) {
      const getFollowsModel = await this.followsModels.getFollowsModel({id})
      const queryCount = {
        followingCount: getFollowsModel.followings.length,
        followerCount: getFollowsModel.followers.length
      }

      return {
        getFollowsModel,
        ...queryCount
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
  