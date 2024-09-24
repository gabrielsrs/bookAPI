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
  
    addUserBookService(req, res) {
      // Logic for POST /:id/books/:bookId
    }
  
    removeUserBookService(req, res) {
      // Logic for DELETE /:id/books/:bookId
    }
  }
  
  export { UserBooksServices };
  