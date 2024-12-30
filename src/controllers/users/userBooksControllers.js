import { UserBooksServices } from "../../services/users/userBooksServices.js"
import { UserBooksModels } from "../../models/users/userBooksModels.js"

class UserBooksControllers {
    constructor () {
        this.userBooksServices = new UserBooksServices()
        this.userBooksModels = new UserBooksModels()
    }

    getUserBooksController = async (req, res) => {
        const { userId } = req.params

        const result = await this.userBooksServices.getUserBooksService({ userId }, this.userBooksModels)

        res.status(200).json({
            "status": "success",
            ...result.queryCount,
            items: result.getUserBooksModel
        })
    }

    addUserBookController = async (req, res) => {
        const { userId, bookId } = req.params

        const result = await this.userBooksServices.addUserBookService({ userId, bookId }, this.userBooksModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    removeUserBookController = async (req, res) => {
        const { userId, bookId } = req.params

        const result = await this.userBooksServices.removeUserBookService({ userId, bookId }, this.userBooksModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { UserBooksControllers }
