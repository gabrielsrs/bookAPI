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

  async createQuoteService({ id, bookId, items }) {
    items.id = ulid()

    items.privacy || (items.privacy = true)

    const { book_locale: bookLocale } = items

    bookLocale.id = ulid()
    
    const createQuoteModel = await this.quotesModels.createQuoteModel({ id, bookId, items, bookLocale })

    return {
      ...createQuoteModel
    }
  }

  async updateQuoteService({ quoteId, items }) {
    const { book_locale: bookLocale } = items

    const updateQuoteModel = await this.quotesModels.updateQuoteModel({ quoteId, items, bookLocale })

    return {
      ...updateQuoteModel
    }
  }

  async deleteQuoteService({ quoteId }) {
    const deleteQuoteModel = await this.quotesModels.deleteQuoteModel({ quoteId })

    return {
      ...deleteQuoteModel
    }
  }
}
  
  export { QuotesServices };
  