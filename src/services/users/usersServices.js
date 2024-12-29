import { UsersModels } from "../../models/users/usersModels.js"

import { ulid } from 'ulid'
import dayjs from "dayjs"

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

  async createUserService({nickname, description, cover_image}) {
    const user = {
      id: ulid(),
      nickname,
      description,
      coverImage: cover_image,
      updatedAt: dayjs().format("YYYY-MM-DD[T]HH:mm:ss")
    }

    const createUserModel = await this.usersModels.createUserModel({user})

    return {
      ...createUserModel
    }
  }

  async updateUserService({
    id,
    items
  }) {
    const updateUserModel = await this.usersModels.updateUserModel({id, items })

    return {
      ...updateUserModel
    }
  }

  async deleteUserService({id}) {
    const deleteUserModel = await this.usersModels.deleteUserModel({id})

    return {
      ...deleteUserModel
    }
  }
}
  
  export { UsersServices };
  