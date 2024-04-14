import { Router } from "express"
import { getRestaurante, createRestaurante, deleteRestaurante, putRestaurante } from "../../../controllers/RestauranteC.js"
import { permissionController } from "../../../controllers/PermissionC.js"
import cocineroRouter from "./cocinerorouter.js"
import asyncMiddleware from "middleware-async"


const restauranteRouter = Router()
restauranteRouter.get("/:restauranteId", permissionController("admin"), asyncMiddleware(getRestaurante))
restauranteRouter.get("/", permissionController("admin"), asyncMiddleware(getRestaurante))
restauranteRouter.post("/", permissionController("superadmin"), asyncMiddleware(createRestaurante))
restauranteRouter.put("/:restauranteId", permissionController("admin"), asyncMiddleware(putRestaurante))
restauranteRouter.delete("/:restauranteId", permissionController("superadmin"), asyncMiddleware(deleteRestaurante))

restauranteRouter.use("/:restauranteId/users", cocineroRouter)

export default restauranteRouter