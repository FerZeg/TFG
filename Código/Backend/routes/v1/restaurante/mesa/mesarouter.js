import { Router } from "express"
import { deleteMesa, putMesa, createTicket } from "../../../../controllers/MesaC.js"
import { permissionController } from "../../../../controllers/PermissionC.js"
import asyncMiddleware from "middleware-async"

const mesasRouter = Router({ mergeParams: true })

mesasRouter.delete("/:mesaId", permissionController("admin"), deleteMesa)
mesasRouter.put("/:mesaId",  permissionController("admin"), putMesa)
mesasRouter.post("/:mesaId/ticket", asyncMiddleware(createTicket))

export default mesasRouter