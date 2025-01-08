class UserServiceObject {
    getUserModel({ userId }) {
        return { userId }
    }

    getUsersModel() {
        return {
            users: [],
        }
    }

    createUserModel({ items }) {
        return { items }
    }

    updateUserModel({ userId, items }) {
        return { userId, items }
    }

    deleteUserModel({ userId }) {
        return { userId }
    }
}

export { UserServiceObject }