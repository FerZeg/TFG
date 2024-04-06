import { Router } from "express"
import { getUsers, postUser, deleteUser } from "../../../controllers/UserC.js"
import { permissionController } from "../../../controllers/PermissionC.js"
import asyncMiddleware from "middleware-async"

const cocineroRouter = Router({ mergeParams: true })

cocineroRouter.get("/", permissionController("cocinero"), asyncMiddleware(getUsers))
cocineroRouter.post("/", permissionController("admin"), asyncMiddleware(postUser))
cocineroRouter.delete("/:userId", permissionController("admin"), asyncMiddleware(deleteUser))

export default cocineroRouter