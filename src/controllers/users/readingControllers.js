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
  
    createReadingProgressController = async (req, res) => {
      const { id, bookId } = req.params
      const items = req.body

      const result = await this.readingServices.createReadingProgressService({ id, bookId, items })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    updateReadingProgressController = async (req, res) => {
      const { progressId } = req.params
      const items = req.body

      const result = await this.readingServices.updateReadingProgressService({ progressId, items })

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
  
    createReadingGoalController = async (req, res) => {
      const { id, bookId } = req.params
      const items = req.body

      const result = await this.readingServices.createReadingGoalService({ id, bookId, items })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    updateReadingGoalController = async (req, res) => {
      const { goalId } = req.params
      const items = req.body

      const result = await this.readingServices.updateReadingGoalService({ goalId, items })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    deleteReadingGoalController = async (req, res) => {
      const { goalId } = req.params

      const result = this.readingServices.deleteReadingGoalService({ goalId })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  }
  
  export { ReadingControllers }
  