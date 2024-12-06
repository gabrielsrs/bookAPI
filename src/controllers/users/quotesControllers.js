import { QuotesServices } from "../../services/users/quotesServices.js"

class QuotesControllers {
    constructor () {
      this.quotesServices = new QuotesServices()
    }

    getQuotesController = async (req, res) => {
      const { id, bookId } = req.params

      const result = await this.quotesServices.getQuotesService({id, bookId})

      res.status(200).json({
          "status": "success",
          ...result.queryCount,
          items: result.getQuotesModel
      })
    }
  
    createQuoteController = async (req, res) => {
      const { id, bookId } = req.params
      const items = req.body

      const result = await this.quotesServices.createQuoteService({ id, bookId, items })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    updateQuoteController = async (req, res) => {
      const { quoteId } = req.params
      const items = req.body

      const result = await this.quotesServices.updateQuoteService({ quoteId, items })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    deleteQuoteController = async (req, res) => {
      const { quoteId } = req.params

      const result = await this.quotesServices.deleteQuoteService({ quoteId })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  }
  
  export { QuotesControllers }
  