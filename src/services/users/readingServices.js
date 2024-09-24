import { ReadingModels } from "../../models/users/readingModels.js"

class ReadingServices {
    constructor() {
      this.readingModels = new ReadingModels()
    }

    async getReadingProgressService({id, bookId}) {
      const getReadingProgressModel = await this.readingModels.getReadingProgressModel({id, bookId})

      return {
        getReadingProgressService: getReadingProgressModel
      }
    }
  
    createReadingProgressService(req, res) {
      // Logic for POST /:id/:bookId/reading/progress
    }
  
    updateReadingProgressService(req, res) {
      // Logic for PUT /:id/:bookId/reading/progress/:progressId
    }
  
    async getReadingGoalsService({id, bookId}) {
      const getReadingGoalsModel = await this.readingModels.getReadingGoalsModel({id, bookId})
      const queryCount = {
        count: getReadingGoalsModel.length
      }
      
      return {
        getReadingGoalsService: getReadingGoalsModel,
        queryCount
      }
    }
  
    createReadingGoalService(req, res) {
      // Logic for POST /:id/:bookId/reading/goals
    }
  
    updateReadingGoalService(req, res) {
      // Logic for PATCH /:id/:bookId/reading/goals/:goalId
    }
  
    deleteReadingGoalService(req, res) {
      // Logic for DELETE /:id/:bookId/reading/goals/:goalId
    }
  }
  
  export { ReadingServices };
  