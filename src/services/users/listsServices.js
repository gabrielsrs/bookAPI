import { ListsModels } from "../../models/users/listsModels.js"

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

  createListService(req, res) {
    // Logic for POST /:id/lists
  }

  updateListService(req, res) {
    // Logic for PATCH /:id/lists/:listId
  }

  deleteListService(req, res) {
    // Logic for DELETE /:id/lists/:listId
  }

  addBookToListService(req, res) {
    // Logic for POST /:id/lists/:listId/:bookId
  }

  removeBookFromListService(req, res) {
    // Logic for DELETE /:id/lists/:listId/:bookId
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

  likeListService(req, res) {
    // Logic for POST /:id/lists/like/:listId
  }

  unlikeListService(req, res) {
    // Logic for DELETE /:id/lists/like/:listId
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

  followListService(req, res) {
    // Logic for POST /:id/lists/follow/:listId
  }

  unfollowListService(req, res) {
    // Logic for DELETE /:id/lists/follow/:listId
  }
}

export { ListsServices };
