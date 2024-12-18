import { ListsModels } from "../../models/users/listsModels.js"

import { ulid } from 'ulid'
import dayjs from "dayjs"

class ListsServices {
  constructor() {
    this.listsModels = new ListsModels()
  }

  async getListsService ({id, listId}) {
    let getListsModel = null
    
    if (listId) {
      getListsModel = await this.listsModels.getListModel({id, listId})
    } else {
      getListsModel = await this.listsModels.getListsModel({id})
    }

    const queryCount = {
      count: getListsModel.length
    }

    return {
      getListsService: getListsModel,
      queryCount
    }
  }

  async createListService({ id:userId, items }) {
    items.id = ulid()
    items.privacy || (items.privacy = false)
    items.updatedAt = dayjs().format("YYYY-DD-MM[T]HH:mm:ss")
    
    const createListModel = await this.listsModels.createListModel({ userId, items })

    return {
      ...createListModel
    }
  }

  async updateListService({ listId, items }) {
    items.updatedAt = dayjs().format("YYYY-DD-MM[T]HH:mm:ss")

    const updateListModel = await this.listsModels.updateListModel({ listId, items })

    return {
      ...updateListModel
    }
  }

  async deleteListService({ listId }) {
    const deleteListModel = await this.listsModels.deleteListModel({ listId })

    return {
      ...deleteListModel
    }
  }

  async addBookToListService({ listId, bookId }) {
    const addBookToListModel = await this.listsModels.addBookToListModel({ listId, bookId })

    return {
      ...addBookToListModel
    }
  }

  async removeBookFromListService({ listId, bookId }) {
    const removeBookFromListModel = await this.listsModels.removeBookFromListModel({ listId, bookId })

    return {
      ...removeBookFromListModel
    }
  }

  async getLikedListsService ({id, listId}) {
    let getLikedListsModel = null

    if (listId) {
      getLikedListsModel = await this.listsModels.getLikedListModel({id, listId})
    } else {
      getLikedListsModel = await this.listsModels.getLikedListsModel({id})
    }

    const queryCount = {
      count: getLikedListsModel.length
    }

    return {
      getLikedListsService: getLikedListsModel,
      queryCount
    }
  }

  async likeListService({ id:userId, listId }) {
    const likeListModel = await this.listsModels.likeListModel({ id, listId })

    return {
      ...likeListModel
    }
  }

  async unlikeListService({ id:userId, listId }) {
    const unlikeListModel = await this.listsModels.unlikeListModel({ id, listId })

    return {
      ...unlikeListModel
    }
  }

  async getFollowedListsService ({id, listId}) {
    let getFollowedListsModel = null

    if (listId) {
      getFollowedListsModel = await this.listsModels.getFollowedListModel({id, listId})
    } else {
      getFollowedListsModel = await this.listsModels.getFollowedListsModel({id})
    }

    const queryCount = {
      count: getFollowedListsModel.length
    }

    return {
      getFollowedListsService: getFollowedListsModel,
      queryCount
    }
  }

  async followListService({ id:userId, listId }) {
    const followListModel = await this.listsModels.followListModel({ userId, listId })

    return {
      ...followListModel
    }
  }

  async unfollowListService({ id:userId, listId }) {
    const unfollowListModel = await this.listsModels.unfollowListModel({ userId, listId })

    return {
      ...unfollowListModel
    }
  }
}

export { ListsServices };
