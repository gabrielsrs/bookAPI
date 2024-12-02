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
  
    addUserBookService({ id, bookId }) {
      const addUserBookModel = this.userBooksModels.addUserBookModel({ id, bookId })

      return {
        ...addUserBookModel
      }

    }
  
    removeUserBookService({ id, bookId }) {
      const removeUserBookModel = this.userBooksModels.removeUserBookModel({ id, bookId })

      return {
        ...removeUserBookModel
      }
    }
  }
  
  export { UserBooksServices };
  