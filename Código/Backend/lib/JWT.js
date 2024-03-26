import jwt from "jsonwebtoken"

function sign(payload) {
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })
}

function verify(token) {
	return jwt.verify(token, process.env.JWT_SECRET)
}
export { sign, verify }
