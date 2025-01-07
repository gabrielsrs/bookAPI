import { ulid } from 'ulid'
import dayjs from "dayjs"

class ListsServices {
    async getListsService ({ userId, listId }, listsModels) {        
        if (listId) {
            const getListsModel = await listsModels.getListModel({ userId, listId })
            
            return getListsModel
        } else {
            const getListsModel = await listsModels.getListsModel({ userId })

            return {
                count: getListsModel.lists.length,
                ...getListsModel,
            }
        }
    }

    async createListService({ userId, items }, listsModels) {
        items.listId = ulid()
        "privacy" in items || (items.privacy = false)
        items.updatedAt = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")
        
        const createListModel = await listsModels.createListModel({ userId, items })

        return createListModel
    }

    async updateListService({ listId, items }, listsModels) {
        items.updated_at = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")

        const updateListModel = await listsModels.updateListModel({ listId, items })

        return updateListModel
    }

    async deleteListService({ listId }, listsModels) {
        const deleteListModel = await listsModels.deleteListModel({ listId })

        return deleteListModel
    }

    async addBookToListService({ listId, bookId }, listsModels) {
        const addBookToListModel = await listsModels.addBookToListModel({ listId, bookId })

        return addBookToListModel
    }

    async removeBookFromListService({ listId, bookId }, listsModels) {
        const removeBookFromListModel = await listsModels.removeBookFromListModel({ listId, bookId })

        return removeBookFromListModel
    }

    async getLikedListsService ({ userId, listId }, listsModels) {
        if (listId) {
            const getLikedListsModel = await listsModels.getLikedListModel({ userId, listId })

            return {
                count: getLikedListsModel.likes["users_likes"].length,
                ...getLikedListsModel
            }
        } else {
            const getLikedListsModel = await listsModels.getLikedListsModel({ userId })

            getLikedListsModel.likes.forEach((item, index) => {
                getLikedListsModel.likes[index].likesCount = item["users_likes"].length
            })

            return {
                count: getLikedListsModel.likes.length,
                ...getLikedListsModel
            }
        }
    }

    async likeListService({ userId, listId }, listsModels) {
        const likeListModel = await listsModels.likeListModel({ userId, listId })

        return likeListModel
    }

    async unlikeListService({ userId, listId }, listsModels) {
        const unlikeListModel = await listsModels.unlikeListModel({ userId, listId })

        return unlikeListModel
    }

    async getFollowedListsService ({ userId, listId }, listsModels) {
        if (listId) {
            const getFollowedListsModel = await listsModels.getFollowedListModel({ userId, listId })

            return {
                count: getFollowedListsModel.follows["users_followers"].length,
                ...getFollowedListsModel
            }
        } else {
            const getFollowedListsModel = await listsModels.getFollowedListsModel({ userId })

            getFollowedListsModel.follows.map((item, index) => {
                getFollowedListsModel.follows[index].followsCount = item["users_followers"].length
            })
            
            return {
                count: getFollowedListsModel.follows.length,
                ...getFollowedListsModel
            }
        }
    }

    async followListService({ userId, listId }, listsModels) {
        const followListModel = await listsModels.followListModel({ userId, listId })

        return followListModel
    }

    async unfollowListService({ userId, listId }, listsModels) {
        const unfollowListModel = await listsModels.unfollowListModel({ userId, listId })

        return unfollowListModel
    }
}

export { ListsServices }
