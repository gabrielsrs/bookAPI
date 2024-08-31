import { Router } from "express";
import routeBooks from "./books/index.js"
import routeUsers from "./users/index.js"

export const route = Router()

route.use("/", routeBooks)
route.use("/", routeUsers)


