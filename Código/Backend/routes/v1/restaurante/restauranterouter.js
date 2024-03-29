import { Router } from "express"
import { getRestaurante, createRestaurante, deleteRestaurante } from "../../../controllers/RestauranteC.js"
import authController from "../../../controllers/PermissionController.js"
import cocineroRouter from "./cocinerorouter.js"


const restauranteRouter = Router()
restauranteRouter.get("/:restauranteId", authController("admin"), getRestaurante)
restauranteRouter.post("/", authController("superadmin"), createRestaurante)
restauranteRouter.delete("/:restauranteId", authController("superadmin"), deleteRestaurante)

restauranteRouter.use("/:restauranteId/cocineros", cocineroRouter)

export default restauranteRouter