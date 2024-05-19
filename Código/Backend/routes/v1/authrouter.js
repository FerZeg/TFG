import { Router } from "express"
import { loginController, dataController, authenticateMesa, getMesaData } from "../../controllers/AuthC.js"
import asyncMiddleware from "middleware-async"
import { extractMesaToken, extractToken } from "../../controllers/PermissionC.js"

const authRouter = Router()

authRouter.post("/login", asyncMiddleware(loginController))
authRouter.get("/data", extractToken, asyncMiddleware(dataController))
authRouter.post("/mesa", asyncMiddleware(authenticateMesa))
authRouter.get("/mesa", extractMesaToken, asyncMiddleware(getMesaData))


export default authRouter