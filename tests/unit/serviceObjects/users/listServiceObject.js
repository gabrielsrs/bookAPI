class ListServiceObject {
    getListModel({ userId, listId }) {
        return { userId, listId }
    }    
    
    getListsModel({ userId }) {
        return {
            lists: [],
            userId
        }
    }

    createListModel({ userId, items }) {
        return { userId, items }
    }

    updateListModel({ listId, items }) {
        return { listId, items }
    }

    deleteListModel({ listId }) {
        return { listId }
    }

    addBookToListModel({ listId, bookId }) {
        return { listId, bookId }
    }
    
    removeBookFromListModel({ listId, bookId }) {
       return { listId, bookId }
    }

    getLikedListModel({ userId, listId }) {
        return {
            likes: {
                users_likes: []
            },
            userId, 
            listId
        }
    }

    getLikedListsModel({ userId }) {
        return {
            likes: [
                {
                    users_likes: []
                }
            ],
            userId
        }
    }

    likeListModel({ userId, listId }) {
       return { userId, listId }
    }

    unlikeListModel({ userId, listId }){
        return { userId, listId }
    }

    getFollowedListModel({ userId, listId }) {
        return {
            follows: {
                users_followers: []
            },
            userId, 
            listId
        }
    }   

    getFollowedListsModel({ userId }) {
        return {
            follows: [
                {
                    users_followers: []
                }
            ],
            userId
        }
    }

    followListModel({ userId, listId }) {
        return { userId, listId }
    }

    unfollowListModel({ userId, listId }) {
        return { userId, listId }
    }
}

export { ListServiceObject }