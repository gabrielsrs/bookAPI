import { ReadingServices } from "../../services/users/readingServices.js"

class ReadingControllers {
    constructor () {
      this.readingServices = new ReadingServices()
    }

    getReadingProgressController(req, res) {
      const { id, bookId } = req.params

      const result = this.readingServices.getReadingProgressService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    createReadingProgressController(req, res) {
      const { id, bookId } = req.params
      const { privacy, book_locale } = req.body

      const result = this.readingServices.createReadingProgressService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    updateReadingProgressController(req, res) {
      const { id, bookId, progressId } = req.params
      const { privacy, book_locale } = req.body

      const result = this.readingServices.updateReadingProgressService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    getReadingGoalsController(req, res) {
      const { id, bookId } = req.params

      const result = this.readingServices.getReadingGoalsService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    createReadingGoalController(req, res) {
      const { id, bookId } = req.params
      const { name, description, time, end_date, frequency } = req.body

      const result = this.readingServices.createReadingGoalService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    updateReadingGoalController(req, res) {
      const { id, bookId, goalId } = req.params
      const { name, description, time, end_date, frequency } = req.body

      const result = this.readingServices.updateReadingGoalService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    deleteReadingGoalController(req, res) {
      const { id, bookId, goalId } = req.params

      const result = this.readingServices.deleteReadingGoalService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  }
  
  export { ReadingControllers }
  