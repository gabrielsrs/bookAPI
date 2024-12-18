import { ListsServices } from "../../services/users/listsServices.js"

class ListsControllers {
    constructor () {
      this.listsServices = new ListsServices()
    }

    getListsController = async (req, res) => {
      const { id, listId } = req.params

      const result = await this.listsServices.getListsService({id, listId})

      res.status(200).json({
          "status": "success",
          ...result.queryCount,
          items: result.getListsService
      })
    }
  
    createListController = async (req, res) => {
      const { id } = req.params
      const items = req.body

      const result = await this.listsServices.createListService({ id, items })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    updateListController = async (req, res) => {
      const { listId } = req.params
      // const { name, description, privacy } = req.body
      const items = req.body

      const result = await this.listsServices.updateListService({ listId, items })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    deleteListController = async (req, res) => {
      const { listId } = req.params

      const result = await this.listsServices.deleteListService({ listId })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    addBookToListController = async (req, res) => {
      const { listId, bookId } = req.params

      const result = this.listsServices.addBookToListService({ listId, bookId })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    removeBookFromListController = async (req, res) => {
      const { listId, bookId } = req.params

      const result = await this.listsServices.removeBookFromListService({ listId, bookId })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    getLikedListsController = async (req, res) => {
      const { id, listId } = req.params

      const result = await this.listsServices.getLikedListsService({id, listId})

      res.status(200).json({
          "status": "success",
          ...result.queryCount,
          items: result.getLikedListsService
      })
    }


  
    likeListController = async (req, res) => {
      const { id, listId } = req.params

      const result = awaitthis.listsServices.likeListService({ id, listId })

      res.status(200).json({
          "status": "success",
          
      })
    }
  
    unlikeListController = async (req, res) => {
      const { id, listId } = req.params

      const result = awaitthis.listsServices.unlikeListService({ id, listId })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    getFollowedListsController = async (req, res) => {
      const { id, listId } = req.params

      const result = await this.listsServices.getFollowedListsService({id, listId})

      res.status(200).json({
          "status": "success",
          ...result.queryCount,
          items: result.getFollowedListsService
      })
    }
  
    followListController = async (req, res) => {
      const { id, listId } = req.params

      const result = await this.listsServices.followListService({ id, listId })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    unfollowListController = async (req, res) => {
      const { id, listId } = req.params

      const result = await this.listsServices.unfollowListService({ id, listId })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  }
  
  export { ListsControllers }
  