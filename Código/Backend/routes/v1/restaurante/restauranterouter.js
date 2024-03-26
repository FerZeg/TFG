import { Router } from "express"
import { getRestaurante } from "../../../controllers/RestauranteC.js"

const restauranteRouter = Router()
restauranteRouter.get("/", getRestaurante)

export default restauranteRouter