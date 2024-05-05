import { Router } from "express"
import { getRestaurante, createRestaurante, deleteRestaurante, putRestaurante } from "../../../controllers/RestauranteC.js"
import { permissionController } from "../../../controllers/PermissionC.js"
import userRouter from "./user/userrouter.js"
import mesasRouter from "./mesa/mesarouter.js"
import asyncMiddleware from "middleware-async"
import ticketRouter from "./ticket/ticketrouter.js"
import platoRouter from "./plato/platorouter.js"


const restauranteRouter = Router()
restauranteRouter.get("/:restauranteId", permissionController("admin"), asyncMiddleware(getRestaurante))
restauranteRouter.get("/", permissionController("admin"), asyncMiddleware(getRestaurante))
restauranteRouter.post("/", permissionController("superadmin"), asyncMiddleware(createRestaurante))
restauranteRouter.put("/:restauranteId", permissionController("admin"), asyncMiddleware(putRestaurante))
restauranteRouter.delete("/:restauranteId", permissionController("superadmin"), asyncMiddleware(deleteRestaurante))

restauranteRouter.use("/:restauranteId/users", userRouter)
restauranteRouter.use("/:restauranteId/mesas", mesasRouter)
restauranteRouter.use("/:restauranteId/tickets", ticketRouter)
restauranteRouter.use("/:restauranteId/platos", platoRouter)

export default restauranteRouter