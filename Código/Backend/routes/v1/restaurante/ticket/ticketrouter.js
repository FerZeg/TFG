import { Router } from "express"
import { getTicket, deleteTicket } from "../../../../controllers/TicketC.js"
import asyncMiddleware from "middleware-async"
import { permissionController } from "../../../../controllers/PermissionC.js"
const ticketRouter = Router({ mergeParams: true })
ticketRouter.get("/", permissionController("admin") ,asyncMiddleware(getTicket))
ticketRouter.delete("/:ticketId", permissionController("admin"), asyncMiddleware(deleteTicket))
export default ticketRouter