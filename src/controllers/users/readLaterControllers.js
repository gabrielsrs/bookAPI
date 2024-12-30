import { ReadLaterServices } from "../../services/users/readLaterServices.js"
import { ReadLaterModels } from "../../models/users/readLaterModels.js"

class ReadLaterControllers {
    constructor () {
        this.readLaterServices = new ReadLaterServices()
        this.readLaterModels = new ReadLaterModels()
    }

    getReadLaterController = async (req, res) => {
        const { userId } = req.params

        const result = await this.readLaterServices.getReadLaterService({ userId }, this.readLaterModels)

        res.status(200).json({
            "status": "success",
            ...result.queryCount,
            items: result.getReadLetterModel
        })
    }

    createReadLaterController = async (req, res) => {
        const { userId, bookId } = req.params
        const items = req.body

        const result = await this.readLaterServices.createReadLaterService({ userId, bookId, items }, this.readLaterModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    deleteReadLaterController = async (req, res) => {
        const { userId, bookId } = req.params

        const result = await this.readLaterServices.deleteReadLaterService({ userId, bookId }, this.readLaterModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { ReadLaterControllers }
