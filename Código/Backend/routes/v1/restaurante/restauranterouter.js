import { Router } from "express"
import { getRestaurante, createRestaurante, deleteRestaurante } from "../../../controllers/RestauranteC.js"
import authController from "../../../controllers/PermissionController.js"
import cocineroRouter from "./cocinerorouter.js"
import asyncMiddleware from "middleware-async"


const restauranteRouter = Router()
restauranteRouter.get("/:restauranteId", asyncMiddleware(getRestaurante))
restauranteRouter.post("/", authController("superadmin"), asyncMiddleware(createRestaurante))
restauranteRouter.delete("/:restauranteId", authController("superadmin"), asyncMiddleware(deleteRestaurante))

restauranteRouter.use("/:restauranteId/cocineros", cocineroRouter)

export default restauranteRouter