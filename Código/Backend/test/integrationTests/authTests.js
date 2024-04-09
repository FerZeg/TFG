import { describe, it, before, after } from "node:test"
import request from "supertest"
import app from "../../index.js"
import { connectDB, disconnectDB } from "../../connection.js"
import Usuario from "../../Models/Usuario.js"
import Restaurante from "../../Models/Restaurante.js"
// TODO: Hacer lógica para importar datos de prueba
const cocinero = new Usuario({
	nombre: "authTestCocinero",
	contraseña: "authTestCocinero",
	email: "authTestCocinero@cocinero.com",
})
const restaurante = new Restaurante({
	nombre: "authTestRestaurante3",
	direccion: "calle",
	telefono: "123456789",
	platos: [
		{
			nombre: "plato1",
			precio: 10,
			tipo: "tipo1",
			ingredientes: ["ingrediente1", "ingrediente2"],
		},
	],
	mesas: [
		{
			identificador: "mesa1",
		},
	],
	users: [
		{
			user: cocinero._id,
			role: "cocinero",
		},
	],
	contraseña_mesas: "1234",
})

before(async() => {
	await connectDB()
	await cocinero.save()
	await restaurante.save()
})
after(async() => {
	await cocinero.deleteOne()
	await restaurante.deleteOne()
	await disconnectDB()
})

describe("AuthController Tests", () => {
	it("should pass with a valid password and email", async () => {
		const payload = {
			email: cocinero.email,
			password: "authTestCocinero"
		}
		console.log(payload)
		await request(app)
			.post("/api/v1/auth/login")
			.send(payload)
			.expect(200)
			.expect("Content-Type", /json/)

	})
	it("should fail with an invalid password", async () => {
		const payload = {
			email: cocinero.email,
			password: "invalidPassword"
		}

		await request(app)
			.post("/api/v1/auth/login/")
			.send(payload)
			.expect(401)
			.expect("Content-Type", /json/)
	}
	)
})