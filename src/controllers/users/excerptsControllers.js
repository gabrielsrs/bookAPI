import { ExcerptsServices } from "../../services/users/excerptsServices.js"

class ExcerptsControllers {
    constructor () {
      this.excerptsServices = new ExcerptsServices()
    }

    getExcerptsController (req, res) {
      const { id, bookId } = req.params

      const result = this.excerptsServices.getExcerptsService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    createExcerptsController (req, res) {
      const { id, bookId } = req.params
      const { content, privacy, book_locale } = req.body

      const result = this.excerptsServices.createExcerptService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    updateExcerptsController (req, res) {
      const { id, excerptId } = req.params
      const { content, privacy, book_locale } = req.body

      const result = this.excerptsServices.updateExcerptService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    deleteExcerptsController (req, res) {
      const { id, excerptId } = req.params

      const result = this.excerptsServices.deleteExcerptService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  }
  
  export { ExcerptsControllers }
  