import { Router } from "express"
import { loginController } from "../../controllers/AuthController.js"

const authRouter = Router()

authRouter.post("/login", loginController)

export default authRouter