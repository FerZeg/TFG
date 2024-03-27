import jwt from "jsonwebtoken"

function sign(payload) {
	if(!payload.username) {
		throw new Error("Username is required to generate token")
	}
	if(!payload.type) {
		throw new Error("Type is required to generate token")
	}
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })
}

function verify(token) {
	return jwt.verify(token, process.env.JWT_SECRET)
}
export { sign, verify }
