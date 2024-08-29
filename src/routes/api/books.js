import { Router } from "express";

export const routeBooks = Router() 

routeBooks.get("/") 
routeBooks.get("/:id") 
routeBooks.post("/:id") 
routeBooks.patch("/:id") 
routeBooks.delete("/:id") 
routeBooks.get("/:id/metadata") 
routeBooks.get("/:id/notes") 
routeBooks.get("/:id/highlights") 
routeBooks.get("/:id/excerpts") 
routeBooks.get("/:id/bookmark") 
routeBooks.get("/filter") 