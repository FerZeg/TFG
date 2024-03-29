import jwt from "jsonwebtoken"

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
	return jwt.verify(token, process.env.JWT_SECRET)
}
function extractBearerToken(header) {
	if(!header) {
		return null
	}
	const [type, token] = header.split(" ")
	if(type !== "Bearer") {
		return null
	}
	return token
}
export { sign, verify, extractBearerToken}
