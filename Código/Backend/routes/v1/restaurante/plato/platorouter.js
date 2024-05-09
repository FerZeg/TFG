import { Router } from "express"
const platoRouter = Router({ mergeParams: true })
import asyncMiddleware from "middleware-async"
import { putPlato, deletePlato } from "../../../../controllers/PlatoC.js"
import { permissionController } from "../../../../controllers/PermissionC.js"

platoRouter.put("/:platoId", permissionController("cocinero"), asyncMiddleware(putPlato))
platoRouter.put("/", permissionController("cocinero"), asyncMiddleware(putPlato))
platoRouter.delete("/:platoId", permissionController("cocinero"), asyncMiddleware(deletePlato))

export default platoRouter