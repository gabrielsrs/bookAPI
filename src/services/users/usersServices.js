import { ulid } from 'ulid'
import dayjs from "dayjs"

class UsersServices {
  async getUsersService({ userId }, usersModels) {
    let getUsersModel = null

    if (userId) {
      getUsersModel = await usersModels.getUserModel({ userId })
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
      userId: ulid(),
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

  async updateUserService({ userId, items }, usersModels) {
    const updateUserModel = await usersModels.updateUserModel({ userId, items })

    return {
      ...updateUserModel
    }
  }

  async deleteUserService({ userId }, usersModels) {
    const deleteUserModel = await usersModels.deleteUserModel({ userId })

    return {
      ...deleteUserModel
    }
  }
}

export { UsersServices }
