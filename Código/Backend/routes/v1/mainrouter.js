import { Router } from "express"
import restauranteRouter from "./restaurante/restauranterouter.js"

const mainRouter = Router()
mainRouter.use("/restaurante", restauranteRouter)

export default mainRouter