import { Router } from "express"
import { getTicket, deleteTicket, getPendiente } from "../../../../controllers/TicketC.js"
import asyncMiddleware from "middleware-async"
import { permissionController } from "../../../../controllers/PermissionC.js"
const ticketRouter = Router({ mergeParams: true })
ticketRouter.get("/", permissionController("cocinero") ,asyncMiddleware(getTicket))
ticketRouter.delete("/:ticketId", permissionController("admin"), asyncMiddleware(deleteTicket))
ticketRouter.get("/pendiente", permissionController("cocinero"), asyncMiddleware(getPendiente))
export default ticketRouter