import { Router } from "express";

const files = await Promise.all([
    import("./bookRoutes.js"),
    import("./bookFilterRoutes.js"),
    import("./bookDetailsRoutes.js"),
    import("./ratingRoutes.js")

])

const routeBooks = Router() 

for await (const file of files) {
    routeBooks.use("/books", file.default)
}

export default routeBooks