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
		if(payload.type === "superadmin" || (assignPermissionNumber(payload.type) >= assignPermissionNumber(type) && payload.restauranteId == req.params.restauranteId)) {
			req.user = payload
			return next()
		}
		throw new UnauthorizedError("No tienes permiso para este recurso")
	}
}

export default authController