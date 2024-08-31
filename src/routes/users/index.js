import { Router } from "express";

const files = await Promise.all([
    import("./usersRoutes.js"),
    import("./userFilterRoutes.js"),
    import("./userBooksRoutes.js"),
    import("./followsRoutes.js"),
    import("./notesRoutes.js"),
    import("./quotesRoutes.js"),
    import("./excerptsRoutes.js"),
    import("./bookmarksRoutes.js"),
    import("./readLaterRoutes.js"),
    import("./listsRoutes.js"),
    import("./readingRoutes.js"),
    import("./remindersRoutes.js")
])

const routeUsers = Router()

for await (const file of files) {
    routeUsers.use("/users", file.default)
}

export default routeUsers