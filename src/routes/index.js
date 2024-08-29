import { Router } from "express";
import { routeBooks } from "./api/books.js"
import { routeUsers } from "./api/users.js"

export const route = Router()

route.use("/books", routeBooks)
route.use("/users", routeUsers)


