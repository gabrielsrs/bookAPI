import { ulid } from 'ulid'

class FollowsServices {
    async getFollowsService ({ userId }, followsModels) {
        const getFollowsModel = await followsModels.getFollowsModel({ userId })

        return {
            followingCount: getFollowsModel.followings.length,
            followerCount: getFollowsModel.followers.length,
            ...getFollowsModel,
        }
    }

    async createFollowService({ userId: follow, follow: followed }, followsModels) {
        const followId = ulid()

        const createFollowModel = await followsModels.createFollowModel({ followId, follow, followed })

        return createFollowModel
    }

    async deleteFollowService({ userId: unfollow, follow: unfollowed }, followsModels) {
        const deleteFollowModel = await followsModels.deleteFollowModel({ unfollow, unfollowed })

        return deleteFollowModel
    }
}

export { FollowsServices }
