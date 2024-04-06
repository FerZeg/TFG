import { Router } from "express"
import { getRestaurante, createRestaurante, deleteRestaurante } from "../../../controllers/RestauranteC.js"
import { permissionController } from "../../../controllers/PermissionC.js"
import cocineroRouter from "./cocinerorouter.js"
import asyncMiddleware from "middleware-async"


const restauranteRouter = Router()
restauranteRouter.get("/:restauranteId", permissionController("cocinero"), asyncMiddleware(getRestaurante))
restauranteRouter.get("/", permissionController("superadmin"), asyncMiddleware(getRestaurante))
restauranteRouter.post("/", permissionController("superadmin"), asyncMiddleware(createRestaurante))
restauranteRouter.delete("/:restauranteId", permissionController("superadmin"), asyncMiddleware(deleteRestaurante))

restauranteRouter.use("/:restauranteId/users", cocineroRouter)

export default restauranteRouter