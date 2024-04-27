import { Router } from "express"
import { getUsers, postUser, deleteUser, putUser } from "../../../controllers/UserC.js"
import { permissionController } from "../../../controllers/PermissionC.js"
import asyncMiddleware from "middleware-async"

const userRouter = Router({ mergeParams: true })

userRouter.get("/", permissionController("cocinero"), asyncMiddleware(getUsers))
userRouter.post("/", permissionController("admin"), asyncMiddleware(postUser))
userRouter.delete("/:userId", permissionController("admin"), asyncMiddleware(deleteUser))
userRouter.put("/:userId", permissionController("admin"), asyncMiddleware(putUser))

export default userRouter