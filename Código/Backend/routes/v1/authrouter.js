import { Router } from "express"
import { loginController } from "../../controllers/AuthController.js"
import asyncMiddleware from "middleware-async"

const authRouter = Router()

authRouter.post("/login", asyncMiddleware(loginController))

export default authRouter