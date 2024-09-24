import { UsersModels } from "../../models/users/usersModels.js"

class UsersServices {
  constructor() {
    this.usersModels = new UsersModels()
  }

  async getUsersService({id}) {
    let getUsersModel = null

    if (id) {
      getUsersModel = await this.usersModels.getUserModel({id})
    } else {
      getUsersModel = await this.usersModels.getUsersModel()
    }

    const queryCount = {
      count: getUsersModel.length
    }

    return {
      getUsersModel,
      queryCount
    }
  }

  createUserService(req, res) {
    // Logic for POST /
  }

  updateUserService(req, res) {
    // Logic for PATCH /:id
  }

  deleteUserService(req, res) {
    // Logic for DELETE /:id
  }
}
  
  export { UsersServices };
  