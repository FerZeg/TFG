import { Router } from "express"
import { getTicket, deleteTicket, getPendiente, updateProductStatus, updateProductQuantity, createPedido, finish } from "../../../../controllers/TicketC.js"
import asyncMiddleware from "middleware-async"
import { permissionController } from "../../../../controllers/PermissionC.js"
const ticketRouter = Router({ mergeParams: true })
ticketRouter.get("/", permissionController("cocinero") ,asyncMiddleware(getTicket))
ticketRouter.get("/pendiente", permissionController("cocinero"), asyncMiddleware(getPendiente))
ticketRouter.get("/:ticketId", asyncMiddleware(getTicket))
ticketRouter.delete("/:ticketId", permissionController("admin"), asyncMiddleware(deleteTicket))
ticketRouter.post("/:ticketId/producto/status", permissionController("cocinero"), asyncMiddleware(updateProductStatus))
ticketRouter.post("/:ticketId/producto/quantity", permissionController("cocinero"), asyncMiddleware(updateProductQuantity))
ticketRouter.post("/:ticketId/pedido", asyncMiddleware(createPedido))
ticketRouter.post("/:ticketId/finish", asyncMiddleware(finish))
export default ticketRouter