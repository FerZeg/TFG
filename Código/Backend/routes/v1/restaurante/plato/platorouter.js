import { Router } from "express"
const platoRouter = Router({ mergeParams: true })
import asyncMiddleware from "middleware-async"
import { putPlato, deletePlato } from "../../../../controllers/PlatoC.js"

platoRouter.put("/:platoId", asyncMiddleware(putPlato))
platoRouter.delete("/:platoId", asyncMiddleware(deletePlato))

export default platoRouter