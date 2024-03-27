import { UnauthorizedError } from "../lib/Errors"
import { verify } from "../lib/JWT.js"
import { assignPermissionNumber } from "../lib/Permissions.js"

const authController = (type) => {
	return (req, res, next) => {
		const token = req.cookies.token
		if(!token) {
			throw new UnauthorizedError("Token is required")
		}
		const payload = verify(token)
		if(assignPermissionNumber (payload.type) < assignPermissionNumber(type)) {
			throw new UnauthorizedError("No tienes permiso para acceder a este recurso")
		}
		req.user = payload
		next()
	}
}

export default authController