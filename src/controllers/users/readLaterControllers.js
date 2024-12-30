import { ReadLaterServices } from "../../services/users/readLaterServices.js"
import { ReadLaterModels } from "../../models/users/readLaterModels.js"

class ReadLaterControllers {
    constructor () {
        this.readLaterServices = new ReadLaterServices()
        this.readLaterModels = new ReadLaterModels()
    }

    getReadLaterController = async (req, res) => {
        const { id } = req.params

        const result = await this.readLaterServices.getReadLaterService({ id }, this.readLaterModels)

        res.status(200).json({
            "status": "success",
            ...result.queryCount,
            items: result.getReadLetterModel
        })
    }

    createReadLaterController = async (req, res) => {
        const { id, bookId } = req.params
        const items = req.body

        const result = await this.readLaterServices.createReadLaterService({ id, bookId, items }, this.readLaterModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    deleteReadLaterController = async (req, res) => {
        const { id, bookId } = req.params

        const result = await this.readLaterServices.deleteReadLaterService({ id, bookId }, this.readLaterModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { ReadLaterControllers }
