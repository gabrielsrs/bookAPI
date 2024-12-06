import { ExcerptsServices } from "../../services/users/excerptsServices.js"

class ExcerptsControllers {
    constructor () {
      this.excerptsServices = new ExcerptsServices()
    }

    getExcerptsController = async (req, res) => {
      const { id, bookId } = req.params

      const result = await this.excerptsServices.getExcerptsService({id, bookId})

      res.status(200).json({
          "status": "success",
          ...result.queryCount,
          items: result.getExcerptsModel
      })
    }
  
    createExcerptsController = async (req, res) => {
      const { id, bookId } = req.params
      const items = req.body

      const result = await this.excerptsServices.createExcerptService({ id, bookId, items })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    updateExcerptsController = async (req, res) => {
      const { excerptId } = req.params
      const items = req.body

      const result = await this.excerptsServices.updateExcerptService({ excerptId, items })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    deleteExcerptsController = async (req, res) => {
      const { excerptId } = req.params

      const result = this.excerptsServices.deleteExcerptService({ excerptId })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  }
  
  export { ExcerptsControllers }
  