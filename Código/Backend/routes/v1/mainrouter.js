import { Router } from "express"
import restauranteRouter from "./restaurante/restauranterouter.js"

const mainRouter = Router()
mainRouter.use("/restaurantes", restauranteRouter)

export default mainRouter