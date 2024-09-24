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
  
    createQuoteController(req, res) {
      const { id, bookId } = req.params
      const { content, privacy, book_locale } = req.body

      const result = this.quotesServices.createQuoteService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    updateQuoteController(req, res) {
      const { id, quotesId } = req.params
      const { content, privacy, book_locale } = req.body

      const result = this.quotesServices.updateQuoteService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    deleteQuoteController(req, res) {
      const { id, quotesId } = req.params

      const result = this.quotesServices.deleteQuoteService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  }
  
  export { QuotesControllers }
  