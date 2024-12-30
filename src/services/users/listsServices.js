import { ulid } from 'ulid'
import dayjs from "dayjs"

class ListsServices {
    async getListsService ({ id, listId }, listsModels) {
        let getListsModel = null
        
        if (listId) {
            getListsModel = await listsModels.getListModel({ id, listId })
        } else {
            getListsModel = await listsModels.getListsModel({ id })
        }

        const queryCount = {
            count: getListsModel.length
        }

        return {
            getListsService: getListsModel,
            queryCount
        }
    }

    async createListService({ id: userId, items }, listsModels) {
        items.id = ulid()
        items.privacy || (items.privacy = false)
        items.updatedAt = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")
        
        const createListModel = await listsModels.createListModel({ userId, items })

        return {
            ...createListModel
        }
    }

    async updateListService({ listId, items }, listsModels) {
        items.updated_at = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")

        const updateListModel = await listsModels.updateListModel({ listId, items })

        return {
            ...updateListModel
        }
    }

    async deleteListService({ listId }, listsModels) {
        const deleteListModel = await listsModels.deleteListModel({ listId })

        return {
            ...deleteListModel
        }
    }

    async addBookToListService({ listId, bookId }, listsModels) {
        const addBookToListModel = await listsModels.addBookToListModel({ listId, bookId })

        return {
            ...addBookToListModel
        }
    }

    async removeBookFromListService({ listId, bookId }, listsModels) {
        const removeBookFromListModel = await listsModels.removeBookFromListModel({ listId, bookId })

        return {
            ...removeBookFromListModel
        }
    }

    async getLikedListsService ({ id, listId }, listsModels) {
        let getLikedListsModel = null

        if (listId) {
            getLikedListsModel = await listsModels.getLikedListModel({ id, listId })
        } else {
            getLikedListsModel = await listsModels.getLikedListsModel({ id })
        }

        const queryCount = {
            count: getLikedListsModel.length
        }

        return {
            getLikedListsService: getLikedListsModel,
            queryCount
        }
    }

    async likeListService({ id: userId, listId }, listsModels) {
        const likeListModel = await listsModels.likeListModel({ userId, listId })

        return {
            ...likeListModel
        }
    }

    async unlikeListService({ id: userId, listId }, listsModels) {
        const unlikeListModel = await listsModels.unlikeListModel({ userId, listId })

        return {
            ...unlikeListModel
        }
    }

    async getFollowedListsService ({ id, listId }, listsModels) {
        let getFollowedListsModel = null

        if (listId) {
            getFollowedListsModel = await listsModels.getFollowedListModel({ id, listId })
        } else {
            getFollowedListsModel = await listsModels.getFollowedListsModel({ id })
        }

        const queryCount = {
            count: getFollowedListsModel.length
        }

        return {
            getFollowedListsService: getFollowedListsModel,
            queryCount
        }
    }

    async followListService({ id: userId, listId }, listsModels) {
        const followListModel = await listsModels.followListModel({ userId, listId })

        return {
            ...followListModel
        }
    }

    async unfollowListService({ id: userId, listId }, listsModels) {
        const unfollowListModel = await listsModels.unfollowListModel({ userId, listId })

        return {
            ...unfollowListModel
        }
    }
}

export { ListsServices }
