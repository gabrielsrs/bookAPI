import { ReadLaterModels } from "../../models/users/readLaterModels.js";

import { ulid } from 'ulid'
import dayjs from "dayjs"

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

  async createReadLaterService({ id, bookId, items }) {
    items.id = ulid()
    items.userId = id
    items.bookId = bookId
    items.updatedAt = dayjs().format("YYYY-DD-MM[T]HH:mm:ss")

    items.privacy || (items.privacy = false)

    const createReadLaterModel = await this.readLaterModels.createReadLaterModel({ items })
    
    return {
      ...createReadLaterModel
    }
  }

  async deleteReadLaterService({ id: userId, bookId }) {
    const deleteReadLaterModel = await this.readLaterModels.deleteReadLaterModel({ userId, bookId })

    return { 
      ...deleteReadLaterModel
    }
  }
}

export { ReadLaterServices };
  