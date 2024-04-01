import { Router } from "express"
import { getRestaurante, createRestaurante, deleteRestaurante } from "../../../controllers/RestauranteC.js"
import { permissionController } from "../../../controllers/PermissionC.js"
import cocineroRouter from "./cocinerorouter.js"
import asyncMiddleware from "middleware-async"


const restauranteRouter = Router()
restauranteRouter.get("/:restauranteId", asyncMiddleware(getRestaurante))
restauranteRouter.get("/", permissionController("superadmin"), asyncMiddleware(getRestaurante))
restauranteRouter.post("/", permissionController("superadmin"), asyncMiddleware(createRestaurante))
restauranteRouter.delete("/:restauranteId", permissionController("superadmin"), asyncMiddleware(deleteRestaurante))

restauranteRouter.use("/:restauranteId/cocineros", cocineroRouter)

export default restauranteRouter