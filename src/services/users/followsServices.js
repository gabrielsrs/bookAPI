import { ulid } from 'ulid'

class FollowsServices {
    async getFollowsService ({ id }, followsModels) {
        const getFollowsModel = await followsModels.getFollowsModel({ id })
        const queryCount = {
            followingCount: getFollowsModel.followings.length,
            followerCount: getFollowsModel.followers.length
        }

        return {
            getFollowsModel,
            ...queryCount
        }
    }

    async createFollowService({ id: follow, userId: followed }, followsModels) {
        const id = ulid()

        const createFollowModel = await followsModels.createFollowModel({ id, follow, followed })

        return {
            ...createFollowModel
        }
    }

    async deleteFollowService({ id: unfollow, userId: unfollowed }, followsModels) {
        const deleteFollowModel = await followsModels.deleteFollowModel({ unfollow, unfollowed })

        return {
            ...deleteFollowModel
        }
    }
}

export { FollowsServices }
