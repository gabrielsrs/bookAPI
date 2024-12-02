import { UserBooksModels } from "../../models/users/userBooksModels.js";

class UserBooksServices {
    constructor () {
      this.userBooksModels = new UserBooksModels()
    }

    async getUserBooksService({id}) {
      const getUserBooksModel = await this.userBooksModels.getUserBooksModel({id})
      const queryCount = {
        count: getUserBooksModel.length
      }

      return {
        getUserBooksModel,
        queryCount
      }
    }
  
    async addUserBookService({ id, bookId }) {
      const addUserBookModel = await this.userBooksModels.addUserBookModel({ id, bookId })

      return {
        ...addUserBookModel
      }

    }
  
    async removeUserBookService({ id, bookId }) {
      const removeUserBookModel = await this.userBooksModels.removeUserBookModel({ id, bookId })

      return {
        ...removeUserBookModel
      }
    }
  }
  
  export { UserBooksServices };
  