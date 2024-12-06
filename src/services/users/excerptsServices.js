import { ExcerptsModels } from "../../models/users/excerptsModels.js";

class ExcerptsServices {
  constructor () {
    this.excerptsModels = new ExcerptsModels()
  }
  
  async getExcerptsService({id, bookId}) {
    let getExcerptsModel = null

    if (bookId) {
      getExcerptsModel = await this.excerptsModels.getBookExcerptsModel({id, bookId})
    } else {
      getExcerptsModel = await this.excerptsModels.getBooksExcerptsModel({id})
    }

    const queryCount = {
      count: getExcerptsModel.length
    }

    return {
      getExcerptsModel,
      queryCount
    }
  }

  async createExcerptService({ id, bookId, items }) {
    items.id = ulid()

    items.privacy || (items.privacy = true)

    const { book_locale: bookLocale } = items

    bookLocale.id = ulid()
    
    const createExcerptModel = await this.excerptsModels.createExcerptModel({ id, bookId, items, bookLocale })

    return {
      ...createExcerptModel
    }
  }

  async updateExcerptService({ excerptId, items }) {
    const { book_locale: bookLocale } = items

    const updateExcerptModel = await this.excerptsModels.updateExcerptModel({ excerptId, items, bookLocale })

    return {
      ...updateExcerptModel
    }
  }

  async deleteExcerptService({ excerptId }) {
    const deleteExcerptModel = await this.excerptsModels.deleteExcerptModel({ excerptId })

    return {
      ...deleteExcerptModel
    }
  }
}

export { ExcerptsServices };
