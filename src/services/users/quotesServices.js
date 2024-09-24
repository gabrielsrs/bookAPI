import { QuotesModels } from "../../models/users/quotesModels.js";

class QuotesServices {
  constructor () {
    this.quotesModels = new QuotesModels()
  }

  async getQuotesService({id, bookId}) {
    let getQuotesModel = null

    if (bookId) {
      getQuotesModel = await this.quotesModels.getBookQuotesModel({id, bookId})
    } else {
      getQuotesModel = await this.quotesModels.getBooksQuotesModel({id})
    }

    const queryCount = {
      count: getQuotesModel.length
    }

    return {
      getQuotesModel,
      queryCount
    }
  }

  createQuoteService(req, res) {
    // Logic for POST /:id/quotes/:bookId
  }

  updateQuoteService(req, res) {
    // Logic for PATCH /:id/quotes/:quotesId
  }

  deleteQuoteService(req, res) {
    // Logic for DELETE /:id/quotes/:quotesId
  }
}
  
  export { QuotesServices };
  