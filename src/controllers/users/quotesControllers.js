import { QuotesServices } from "../../services/users/quotesServices.js"
import { QuotesModels } from "../../models/users/quotesModels.js"

class QuotesControllers {
    constructor () {
        this.quotesServices = new QuotesServices()
        this.quotesModels = new QuotesModels()
    }

    getQuotesController = async (req, res) => {
        const { userId, bookId } = req.params

        const result = await this.quotesServices.getQuotesService({ userId, bookId }, this.quotesModels)

        res.status(200).json({
            "status": "success",
            ...result.queryCount,
            items: result.getQuotesModel
        })
    }

    createQuoteController = async (req, res) => {
        const { userId, bookId } = req.params
        const items = req.body

        const result = await this.quotesServices.createQuoteService({ userId, bookId, items }, this.quotesModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    updateQuoteController = async (req, res) => {
        const { quoteId } = req.params
        const items = req.body

        const result = await this.quotesServices.updateQuoteService({ quoteId, items }, this.quotesModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }

    deleteQuoteController = async (req, res) => {
        const { quoteId } = req.params

        const result = await this.quotesServices.deleteQuoteService({ quoteId }, this.quotesModels)

        res.status(200).json({
            "status": "success",
            ...result
        })
    }
}

export { QuotesControllers }
