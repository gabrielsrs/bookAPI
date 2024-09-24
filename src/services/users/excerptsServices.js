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

  createExcerptService(req, res) {
    // Logic for POST /:id/excerpts/:bookId
  }

  updateExcerptService(req, res) {
    // Logic for PATCH /:id/excerpts/:excerptId
  }

  deleteExcerptService(req, res) {
    // Logic for DELETE /:id/excerpts/:excerptId
  }
}

export { ExcerptsServices };
