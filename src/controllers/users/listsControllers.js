import { ListsServices } from "../../services/users/listsServices.js"
import { ListsModels } from "../../models/users/listsModels.js"

class ListsControllers {
    constructor () {
        this.listsServices = new ListsServices()
        this.listsModels = new ListsModels()
    }

    getListsController = async (req, res) => {
        const { id, listId } = req.params

        const result = await this.listsServices.getListsService({ id, listId }, this.listsModels)

        res.status(200).json({
            "status": "success",
            ...result.queryCount,
            items: result.getListsService
        })
    }

    createListController = async (req, res) => {
        const { id } = req.params
        const items = req.body

        const result = await this.listsServices.createListService({ id, items }, this.listsModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    updateListController = async (req, res) => {
        const { listId } = req.params
        const items = req.body

        const result = await this.listsServices.updateListService({ listId, items }, this.listsModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    deleteListController = async (req, res) => {
        const { listId } = req.params

        const result = await this.listsServices.deleteListService({ listId }, this.listsModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    addBookToListController = async (req, res) => {
        const { listId, bookId } = req.params

        const result = await this.listsServices.addBookToListService({ listId, bookId }, this.listsModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    removeBookFromListController = async (req, res) => {
        const { listId, bookId } = req.params

        const result = await this.listsServices.removeBookFromListService({ listId, bookId }, this.listsModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    getLikedListsController = async (req, res) => {
        const { id, listId } = req.params

        const result = await this.listsServices.getLikedListsService({ id, listId }, this.listsModels)

        res.status(200).json({
            "status": "success",
            ...result.queryCount,
            items: result.getLikedListsService
        })
    }

    likeListController = async (req, res) => {
        const { id, listId } = req.params

        const result = await this.listsServices.likeListService({ id, listId }, this.listsModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    unlikeListController = async (req, res) => {
        const { id, listId } = req.params

        const result = await this.listsServices.unlikeListService({ id, listId }, this.listsModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    getFollowedListsController = async (req, res) => {
        const { id, listId } = req.params

        const result = await this.listsServices.getFollowedListsService({ id, listId }, this.listsModels)

        res.status(200).json({
            "status": "success",
            ...result.queryCount,
            items: result.getFollowedListsService
        })
    }

    followListController = async (req, res) => {
        const { id, listId } = req.params

        const result = await this.listsServices.followListService({ id, listId }, this.listsModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    unfollowListController = async (req, res) => {
        const { id, listId } = req.params

        const result = await this.listsServices.unfollowListService({ id, listId }, this.listsModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { ListsControllers }
