import express from "express"
import { route } from "./routes/index.js"

const app = express()
const port = process.env["PORT"]

app.use(express.json());

app.use(route)

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`)
})