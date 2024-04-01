import { Router } from "express"
import { getCocineros, postCocinero, deleteCocinero } from "../../../controllers/CocineroC.js"
import { permissionController } from "../../../controllers/PermissionC.js"
import asyncMiddleware from "middleware-async"

const cocineroRouter = Router({ mergeParams: true })

cocineroRouter.get("/", permissionController("cocinero"), asyncMiddleware(getCocineros))
cocineroRouter.post("/", permissionController("admin"), asyncMiddleware(postCocinero))
cocineroRouter.delete("/:cocineroId", permissionController("admin"), asyncMiddleware(deleteCocinero))

export default cocineroRouter