import { ulid } from 'ulid'

class QuotesServices {
  async getQuotesService({userId, bookId}, quotesModels) {
    let getQuotesModel = null

    if (bookId) {
      getQuotesModel = await quotesModels.getBookQuotesModel({userId, bookId})
    } else {
      getQuotesModel = await quotesModels.getBooksQuotesModel({userId})
    }

    const queryCount = {
      count: getQuotesModel.length
    }

    return {
      getQuotesModel,
      queryCount
    }
  }

  async createQuoteService({ userId, bookId, items }, quotesModels) {
    items.quotId = ulid()

    items.privacy || (items.privacy = true)

    const { book_locale: bookLocale } = items

    bookLocale.bookLocaleId = ulid()
    
    const createQuoteModel = await quotesModels.createQuoteModel({ userId, bookId, items, bookLocale })

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
