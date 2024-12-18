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
  
    createReadLaterController = async (req, res) => {
      const { id, bookId } = req.params
      const items = req.body

      const result = await this.readLaterServices.createReadLaterService({ id, bookId, items })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  
    deleteReadLaterController = async (req, res) => {
      const { id, bookId } = req.params

      const result = await this.readLaterServices.deleteReadLaterService({ id, bookId })

      res.status(200).json({
          "status": "success",
          ...result
      })
    }
  }
  
  export { ReadLaterControllers }
  