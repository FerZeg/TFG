import { UnauthorizedError } from "../lib/Errors.js"
import { extractBearerToken, verify } from "../lib/JWT.js"
import { assignPermissionNumber } from "../lib/Permissions.js"

const authController = (type) => {
	return (req, res, next) => {
		const token = extractBearerToken(req.headers.authorization)
		if(!token) {
			throw new UnauthorizedError("Token is required")
		}
		let payload
		try {
			payload = verify(token)
		} catch (error) {
			throw new UnauthorizedError("Invalid token")
		}
		if(assignPermissionNumber (payload.type) < assignPermissionNumber(type)) {
			throw new UnauthorizedError("No tienes permiso para acceder a este recurso")
		}
		req.user = payload
		next()
	}
}

export default authController