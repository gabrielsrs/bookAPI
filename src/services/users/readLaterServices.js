import { ReadLaterModels } from "../../models/users/readLaterModels.js";

class ReadLaterServices {
  constructor() {
    this.readLaterModels = new ReadLaterModels()
  }

  async getReadLaterService({id}) {
    const getReadLetterModel = await this.readLaterModels.getReadLaterModel({id})
    const queryCount = {
      count: getReadLetterModel.length
    }

    return {
      getReadLetterModel,
      queryCount
    }
  }

  createReadLaterService(req, res) {
    // Logic for POST /:id/readLater/:bookId
  }

  deleteReadLaterService(req, res) {
    // Logic for DELETE /:id/readLater/:bookId
  }
}

export { ReadLaterServices };
  