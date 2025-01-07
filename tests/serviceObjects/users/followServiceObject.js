class FollowServiceObject {
    getFollowsModel({ bookId, userId }) {
        return {
            followings: [],
            followers: [],
            userId
        }
    }

    createFollowModel({ followId, follow, followed }) {
        return { followId, follow, followed }
    }

    deleteFollowModel({ unfollow, unfollowed }) {
        return { unfollow, unfollowed }
    }
}

export { FollowServiceObject }