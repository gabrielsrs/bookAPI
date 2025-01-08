import { ulid } from 'ulid'
import dayjs from "dayjs"

class UsersServices {
  async getUsersService({ userId }, usersModels) {
    if (userId) {
      const getUsersModel = await usersModels.getUserModel({ userId })

      return getUsersModel

    } else {
      const getUsersModel = await usersModels.getUsersModel()

      return {
        count: getUsersModel.users.length,
        ...getUsersModel
      }
    }
  }

  async createUserService({ items }, usersModels) {
    items.userId = ulid()
    items.updatedAt = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")

    const createUserModel = await usersModels.createUserModel({ items })

    return createUserModel
  }

  async updateUserService({ userId, items }, usersModels) {
    items.update_at = dayjs().format("YYYY-MM-DD[T]HH:mm:ss")
    const updateUserModel = await usersModels.updateUserModel({ userId, items })

    return updateUserModel
  }

  async deleteUserService({ userId }, usersModels) {
    const deleteUserModel = await usersModels.deleteUserModel({ userId })

    return deleteUserModel
  }
}

export { UsersServices }
