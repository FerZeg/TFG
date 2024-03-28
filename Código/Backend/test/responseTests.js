import { before, after, it, describe } from "node:test"
import { connectDB, disconnectDB } from "../connection.js"
import { sign } from "../lib/JWT.js"
import assert from "node:assert"
import request from "supertest"
import app from "../index.js"
import Restaurante from "../models/Restaurante.js"


let nuevoRestaurante

before(async() => {
	await connectDB()
	nuevoRestaurante = new Restaurante({
		nombre: "Prueba",
		direccion: "Calle Prueba, 123",
		telefono: "123456789",
		platos: [],
		mesas: [],
		users: [],
		contraseña_mesas: "contraseña_prueba",
		cocineros: [],
	})
	await nuevoRestaurante.save()
			

})
const validAdminToken = sign({ id: 1, type: "admin" })

describe("Routing tests", () => {
	it("should return restaurant data", async () => {
		await request(app)
			.get("/api/v1/restaurante/" + nuevoRestaurante._id)
			.set("Authorization", `Bearer ${validAdminToken}`)
			.expect(200)
			.expect("Content-Type", /json/)
			.expect((res) => {
				assert(res.body.nombre === "Prueba")
			})
	})
})
after(async() => {
	await nuevoRestaurante.deleteOne()
	await disconnectDB()
})
    