import { ExcerptsServices } from "../../services/users/excerptsServices.js"
import { ExcerptsModels } from "../../models/users/excerptsModels.js"

class ExcerptsControllers {
    constructor () {
        this.excerptsServices = new ExcerptsServices()
        this.excerptsModels = new ExcerptsModels()
    }

    getExcerptsController = async (req, res) => {
        const { id, bookId } = req.params

        const result = await this.excerptsServices.getExcerptsService({ id, bookId }, this.excerptsModels)

        res.status(200).json({
            "status": "success",
            ...result.queryCount,
            items: result.getExcerptsModel
        })
    }

    createExcerptsController = async (req, res) => {
        const { id, bookId } = req.params
        const items = req.body

        const result = await this.excerptsServices.createExcerptService({ id, bookId, items }, this.excerptsModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    updateExcerptsController = async (req, res) => {
        const { excerptId } = req.params
        const items = req.body

        const result = await this.excerptsServices.updateExcerptService({ excerptId, items }, this.excerptsModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    deleteExcerptsController = async (req, res) => {
        const { excerptId } = req.params

        const result = await this.excerptsServices.deleteExcerptService({ excerptId }, this.excerptsModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { ExcerptsControllers }
