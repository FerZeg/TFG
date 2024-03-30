import jwt from "jsonwebtoken"
import { BadRequestError, UnauthorizedError } from "./Errors"

function sign(payload) {
	if(!payload.type) {
		throw new Error("Type is required to generate token")
	}
	if(!payload.id) {
		throw new Error("Id is required to generate token")
	}
	if(payload.type === "superadmin") {
		return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })
	}
	if(!payload.restauranteId) {
		throw new Error("Restaurant ID is required to generate token")
	}
	if(!payload.role) {
		throw new Error("Role is required to generate token")
	}
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })
}

function verify(token) {
	try {
		return jwt.verify(token, process.env.JWT_SECRET)
	} catch (error) {
		throw new UnauthorizedError("The token is invalid or has expired")
	}
}
function extractBearerToken(header) {
	if(!header) {
		throw new BadRequestError("Invalid authorization token")
	}
	const [type, token] = header.split(" ")
	if(type !== "Bearer") {
		throw new BadRequestError("Invalid authorization token")
	}
	return token
}
export { sign, verify, extractBearerToken}
