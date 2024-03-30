import { Router } from "express"
import { loginController, dataController } from "../../controllers/AuthC.js"
import asyncMiddleware from "middleware-async"
import { extractToken } from "../../controllers/PermissionC.js"



const authRouter = Router()

authRouter.post("/login", asyncMiddleware(loginController))
authRouter.get("/data", extractToken, asyncMiddleware(dataController))

export default authRouter