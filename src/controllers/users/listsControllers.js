import { ListsServices } from "../../services/users/listsServices"

class ListsControllers {
    constructor () {
      this.listsServices = new ListsServices()
    }

    getListsController (req, res) {
      const { id, listId } = req.params

      const result = this.listsServices.getListsService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    createListController (req, res) {
      const { id } = req.params
      const { name, description, privacy } = req.body

      const result = this.listsServices.createListService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    updateListController (req, res) {
      const { id, listId } = req.params
      const { name, description, privacy } = req.body

      const result = this.listsServices.updateListService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    deleteListController (req, res) {
      const { id, listId } = req.params

      const result = this.listsServices.deleteListService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    addBookToListController (req, res) {
      const { id, listId, bookId } = req.params

      const result = this.listsServices.addBookToListService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    removeBookFromListController (req, res) {
      const { id, listId, bookId } = req.params

      const result = this.listsServices.removeBookFromListService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    getLikedListsController (req, res) {
      const { id } = req.params

      const result = this.listsServices.getLikedListsService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    likeListController (req, res) {
      const { id, listId } = req.params

      const result = this.listsServices.likeListService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    unlikeListController (req, res) {
      const { id, listId } = req.params

      const result = this.listsServices.unlikeListService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    getFollowedListsController (req, res) {
      const { id } = req.params

      const result = this.listsServices.getFollowedListsService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    followListController (req, res) {
      const { id, listId } = req.params

      const result = this.listsServices.followListService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    unfollowListController (req, res) {
      const { id, listId } = req.params

      const result = this.listsServices.unfollowListService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  }
  
  export { ListsControllers }
  