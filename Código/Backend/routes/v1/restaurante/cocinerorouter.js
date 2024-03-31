import { Router } from "express"
import { getCocineros, postCocinero } from "../../../controllers/CocineroC.js"
import { permissionController } from "../../../controllers/PermissionC.js"
import asyncMiddleware from "middleware-async"

const cocineroRouter = Router({ mergeParams: true })

cocineroRouter.get("/", permissionController("admin"), asyncMiddleware(getCocineros))
cocineroRouter.post("/", permissionController("admin"), asyncMiddleware(postCocinero))


export default cocineroRouter