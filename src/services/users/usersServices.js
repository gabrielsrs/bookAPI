import { ulid } from 'ulid'
import dayjs from "dayjs"

class UsersServices {
  async getUsersService({ id }, usersModels) {
    let getUsersModel = null

    if (id) {
      getUsersModel = await usersModels.getUserModel({ id })
    } else {
      getUsersModel = await usersModels.getUsersModel()
    }

    const queryCount = {
      count: getUsersModel.length
    }

    return {
      getUsersModel,
      queryCount
    }
  }

  async createUserService({ nickname, description, cover_image }, usersModels) {
    const user = {
      id: ulid(),
      nickname,
      description,
      coverImage: cover_image,
      updatedAt: dayjs().format("YYYY-MM-DD[T]HH:mm:ss")
    }

    const createUserModel = await usersModels.createUserModel({ user })

    return {
      ...createUserModel
    }
  }

  async updateUserService({ id, items }, usersModels) {
    const updateUserModel = await usersModels.updateUserModel({ id, items })

    return {
      ...updateUserModel
    }
  }

  async deleteUserService({ id }, usersModels) {
    const deleteUserModel = await usersModels.deleteUserModel({ id })

    return {
      ...deleteUserModel
    }
  }
}

export { UsersServices }
