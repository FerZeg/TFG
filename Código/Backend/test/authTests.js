import { describe, it, after, before } from "node:test"
import request from "supertest"
import app from "../index.js"
import { connectDB, disconnectDB } from "../connection.js"

before(async() => {
	await connectDB()
})

describe("AuthController Tests", () => {
	it("should pass with a valid password and email", async () => {
		const payload = {
			email: "cocinero@cocinero.com",
			password: "cocinero"
		}
		const res = await request(app)
			.post("/api/v1/auth/login")
			.send(payload)
			.expect(200)
			.expect("Content-Type", /json/)

		console.log(res.body)

	})
	it("should fail with an invalid password", async () => {
		const payload = {
			email: "cocinero@cocinero.com",
			password: "cocinero123"
		}
		const res = await request(app)
			.post("/api/v1/auth/login")
			.send(payload)
			.expect(401)
			.expect("Content-Type", /json/)
		console.log(res.body)
	}
	)
})

after(async() => {
	await disconnectDB()
})
