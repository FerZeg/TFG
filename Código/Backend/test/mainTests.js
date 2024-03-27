import assert from "node:assert"
import { sign , verify } from "../lib/JWT.js"
import request from "supertest"
import authController from "../controllers/AuthController.js"
import app from "../index.js"
import { describe, it, after, before } from "node:test"
import { disconnectDB, connectDB } from "../connection.js"
import { UnauthorizedError } from "../lib/Errors.js"

app.get("/protected", authController("admin"), (req, res) => {
	res.status(200).send({ message: "Passed" })
})
// Código repetido necesario para que el test funcione con los errores
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	if(err instanceof UnauthorizedError) {
		return res.status(401).send({ message: "No estás autorizado" })
	}
	res.status(522).send({ message: "Error en el servidor" })
	console.log("ERROR" + err)
})

describe("JWT Tests", () => {
	it("should decode the token correctly", () => {
		const payload = {
			id: 1,
			type: "admin"
		}
		const token = sign(payload)
		const decoded = verify(token)
		assert.equal(decoded.id, payload.id)
	})
})

describe("AuthController Tests", () => {
	it("should pass with a valid token", async () => {
		const payload = {
			id: 1,
			type: "admin"
		}
		const token = sign(payload)
		const response = await request(app)
			.get("/protected")
			.set("Authorization", `Bearer ${token}`)
			.expect(200)
		assert.equal(response.body.message, "Passed")
	})

	it("should fail with an invalid token", async () => {
		await request(app)
			.get("/protected")
			.set("Authorization", "Bearer invalidtoken")
			.expect(401)
	})
})
before(async() => {
	await connectDB()
})
after(async() => {
	await disconnectDB()

})

