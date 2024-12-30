import { UserBooksServices } from "../../services/users/userBooksServices.js"
import { UserBooksModels } from "../../models/users/userBooksModels.js"

class UserBooksControllers {
    constructor () {
        this.userBooksServices = new UserBooksServices()
        this.userBooksModels = new UserBooksModels()
    }

    getUserBooksController = async (req, res) => {
        const { id } = req.params

        const result = await this.userBooksServices.getUserBooksService({ id }, this.userBooksModels)

        res.status(200).json({
            "status": "success",
            ...result.queryCount,
            items: result.getUserBooksModel
        })
    }

    addUserBookController = async (req, res) => {
        const { id, bookId } = req.params

        const result = await this.userBooksServices.addUserBookService({ id, bookId }, this.userBooksModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    removeUserBookController = async (req, res) => {
        const { id, bookId } = req.params

        const result = await this.userBooksServices.removeUserBookService({ id, bookId }, this.userBooksModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { UserBooksControllers }
