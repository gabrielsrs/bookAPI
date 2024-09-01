class ListsControllers {
    getListsController(req, res) {
      // Logic for GET /:id/lists/:listId?
    }
  
    createListController(req, res) {
      // Logic for POST /:id/lists
    }
  
    updateListController(req, res) {
      // Logic for PATCH /:id/lists/:listId
    }
  
    deleteListController(req, res) {
      // Logic for DELETE /:id/lists/:listId
    }
  
    addBookToListController(req, res) {
      // Logic for POST /:id/lists/:listId/:bookId
    }
  
    removeBookFromListController(req, res) {
      // Logic for DELETE /:id/lists/:listId/:bookId
    }
  
    getLikedListsController(req, res) {
      // Logic for GET /:id/lists/like
    }
  
    likeListController(req, res) {
      // Logic for POST /:id/lists/like/:listId
    }
  
    unlikeListController(req, res) {
      // Logic for DELETE /:id/lists/like/:listId
    }
  
    getFollowedListsController(req, res) {
      // Logic for GET /:id/lists/follow
    }
  
    followListController(req, res) {
      // Logic for POST /:id/lists/follow/:listId
    }
  
    unfollowListController(req, res) {
      // Logic for DELETE /:id/lists/follow/:listId
    }
  }
  
  export { ListsControllers }
  