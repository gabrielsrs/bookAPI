import { ReadLaterServices } from "../../services/users/readLaterServices.js"

class ReadLaterControllers {
    constructor () {
      this.readLaterServices = new ReadLaterServices()
    }

    getReadLaterController = async (req, res) => {
      const { id } = req.params

      const result = await this.readLaterServices.getReadLaterService({id})

      res.status(200).json({
          "status": "success",
          ...result.queryCount,
          items: result.getReadLetterModel
      })
    }
  
    createReadLaterController(req, res) {
      const { id, bookId } = req.params
      const { privacy } = req.body

      const result = this.readLaterServices.createReadLaterService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    deleteReadLaterController(req, res) {
      const { id, bookId } = req.params

      const result = this.readLaterServices.deleteReadLaterService()

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  }
  
  export { ReadLaterControllers }
  