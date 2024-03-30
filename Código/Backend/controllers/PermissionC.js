import { UnauthorizedError } from "../lib/Errors.js"
import { extractBearerToken, verify } from "../lib/JWT.js"
import { assignPermissionNumber } from "../lib/Permissions.js"

const permissionController = (role) => {
	return (req, res, next) => {
		const token = extractBearerToken(req.headers.authorization)
		const payload = verify(token)
		if(payload.type === "superadmin" || (assignPermissionNumber(payload.role) >= assignPermissionNumber(role) && payload.restauranteId == req.params.restauranteId)) {
			req.user = payload
			return next()
		}
		throw new UnauthorizedError("No tienes permiso para este recurso")
	}
}

const extractToken = (req, res, next) => {
	const token = extractBearerToken(req.headers.authorization)
	req.user = verify(token)
	next()
}

export { permissionController, extractToken }