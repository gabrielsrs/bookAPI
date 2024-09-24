import { ReadingServices } from "../../services/users/readingServices.js"

class ReadingControllers {
    constructor () {
      this.readingServices = new ReadingServices()
    }

    getReadingProgressController = async (req, res) => {
      const { id, bookId } = req.params

      const result = await this.readingServices.getReadingProgressService({id, bookId})

      res.status(200).json({
          "status": "success",
          items: result.getReadingProgressService
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
  
    getReadingGoalsController = async (req, res) => {
      const { id, bookId } = req.params

      const result = await this.readingServices.getReadingGoalsService({id, bookId})

      res.status(200).json({
          "status": "success",
          ...result.queryCount,
          items: result.getReadingGoalsService
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
  