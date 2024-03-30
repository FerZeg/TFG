import request from "supertest"
import { permissionController } from "../../controllers/PermissionC.js"
import app from "../../index.js"
import { describe, it, after, before } from "node:test"
import { sign } from "../../lib/JWT.js"
import { UnauthorizedError } from "../../lib/Errors.js"
import assert from "node:assert"
import { disconnectDB} from "../../connection.js"
import { connectDB } from "../../connection.js"

before(async() => {
	await connectDB()
})

app.get("/:restauranteId/protected", permissionController("cocinero"), (req, res) => {
	res.status(200).send({ message: "Passed" })
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
	it("Debería pasar con un token de superadmin", async () => {
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
	it("Debería pasar con el rol adecuado y el restaurante", async () => {
		const payload = {
			id: 1,
			type: "normal",
			restauranteId: 1,
			role: "cocinero"
		}
		const token = sign(payload)
		const response = await request(app)
			.get("/1/protected")
			.set("Authorization", `Bearer ${token}`)
			.expect(200)
		assert.equal(response.body.message, "Passed")
	})

	it("Debería fallar con un token invalido", async () => {
		await request(app)
			.get("/1/protected")
			.set("Authorization", "Bearer invalidtoken")
			.expect(401)
	})
	it("Debería fallar si el Id del restaurante no es el mismo", async () => {
		const payload = {
			id: 1,
			type: "normal",
			restauranteId: 2,
			role: "cocinero"
		}
		const token = sign(payload)
		await request(app)
			.get("/6/protected")
			.set("Authorization", `Bearer ${token}`)
			.expect(401)
	})
})


after(async() => {
	await disconnectDB()

})