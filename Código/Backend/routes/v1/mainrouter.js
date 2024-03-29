import { Router } from "express"
import restauranteRouter from "./restaurante/restauranterouter.js"
import authRouter from "./authrouter.js"

const mainRouter = Router()
mainRouter.use("/restaurantes", restauranteRouter)
mainRouter.use("/auth", authRouter) 

export default mainRouter