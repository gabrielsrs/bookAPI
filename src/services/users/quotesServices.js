import { ulid } from 'ulid'

class QuotesServices {
  async getQuotesService({id, bookId}, quotesModels) {
    let getQuotesModel = null

    if (bookId) {
      getQuotesModel = await quotesModels.getBookQuotesModel({id, bookId})
    } else {
      getQuotesModel = await quotesModels.getBooksQuotesModel({id})
    }

    const queryCount = {
      count: getQuotesModel.length
    }

    return {
      getQuotesModel,
      queryCount
    }
  }

  async createQuoteService({ id, bookId, items }, quotesModels) {
    items.id = ulid()

    items.privacy || (items.privacy = true)

    const { book_locale: bookLocale } = items

    bookLocale.id = ulid()
    
    const createQuoteModel = await quotesModels.createQuoteModel({ id, bookId, items, bookLocale })

    return {
      ...createQuoteModel
    }
  }

  async updateQuoteService({ quoteId, items }, quotesModels) {
    const { book_locale: bookLocale } = items
    delete items.book_locale

    const updateQuoteModel = await quotesModels.updateQuoteModel({ quoteId, items, bookLocale })

    return {
      ...updateQuoteModel
    }
  }

  async deleteQuoteService({ quoteId }, quotesModels) {
    const deleteQuoteModel = await quotesModels.deleteQuoteModel({ quoteId })

    return {
      ...deleteQuoteModel
    }
  }
}
  
  export { QuotesServices };
