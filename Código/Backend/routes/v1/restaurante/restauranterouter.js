import { Router } from "express"
import { getRestaurante } from "../../../controllers/RestauranteC.js"
import authController from "../../../controllers/AuthController.js"

const restauranteRouter = Router()
restauranteRouter.get("/:restauranteId", authController("admin"), getRestaurante)

export default restauranteRouter