import { Router } from "express"
import restauranteRouter from "./restaurante/restauranterouter.js"
import authRouter from "./authrouter.js"

const mainRouter = Router()
mainRouter.use("/auth", authRouter) 
mainRouter.use("/restaurantes", restauranteRouter)

export default mainRouter