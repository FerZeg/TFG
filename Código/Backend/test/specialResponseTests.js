import request from "supertest"
import authController from "../controllers/AuthController.js"
import app from "../index.js"
import { describe, it, after, before } from "node:test"
import { sign } from "../lib/JWT.js"
import { UnauthorizedError } from "../lib/Errors.js"
import assert from "node:assert"
import { disconnectDB} from "../connection.js"
import { connectDB } from "../connection.js"

before(async() => {
	await connectDB()
})

app.get("/:restauranteId/protected", authController("cocinero"), (req, res) => {
	res.status(200).send({ message: "Passed" })
})
app.get("/error", () => {
	throw new Error("Error")
})
// Código repetido necesario para que el test funcione con los errores
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	if(err instanceof UnauthorizedError) {
		return res.status(401).send({ message: "No estás autorizado" })
	}
	res.status(500).send({ message: "Error en el servidor" })
})

describe("AuthController Tests", () => {
	it("should pass with a valid superadmin token", async () => {
		const payload = {
			id: 1,
			type: "superadmin"
		}
		const token = sign(payload)
		const response = await request(app)
			.get("/1/protected")
			.set("Authorization", `Bearer ${token}`)
			.expect(200)
		assert.equal(response.body.message, "Passed")
	})
	it("should pass with a valid token and restaurantId", async () => {
		const payload = {
			id: 1,
			type: "admin",
			restauranteId: 1
		}
		const token = sign(payload)
		const response = await request(app)
			.get("/1/protected")
			.set("Authorization", `Bearer ${token}`)
			.expect(200)
		assert.equal(response.body.message, "Passed")
	})

	it("should fail with an invalid token", async () => {
		await request(app)
			.get("/1/protected")
			.set("Authorization", "Bearer invalidtoken")
			.expect(401)
	})
	it("should fail if restaurantId is not the same", async () => {
		const payload = {
			id: 1,
			type: "admin",
			restauranteId: 2
		}
		const token = sign(payload)
		await request(app)
			.get("/6/protected")
			.set("Authorization", `Bearer ${token}`)
			.expect(401)
	})
})


describe("Error handling tests", () => {
	it("should return a 404 status code", async () => {
		await request(app)
			.get("/notfound")
			.expect(404)
	})
	it("should return a 500 status code", async () => {
		await request(app)
			.get("/error")
			.expect(500)
	})
})


after(async() => {
	await disconnectDB()

})