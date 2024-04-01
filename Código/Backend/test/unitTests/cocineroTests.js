import { before, after, describe, it} from "node:test"
import { disconnectDB} from "../../connection.js"
import { connectDB } from "../../connection.js"
import CocineroService from "../../services/CocineroService.js"
import { generateRandomRestaurant, generateRandomUser } from "../data/generateData.js"
import assert from "node:assert"
import { Types } from "mongoose"

let restaurante = generateRandomRestaurant()
let user = generateRandomUser()
before(async() => {
	await connectDB()
	await user.save()
	restaurante.users.push({ref: user._id, type: "cocinero"})
	await restaurante.save()
})
after(async() => {
	await restaurante.deleteOne()
	await user.deleteOne()
	await disconnectDB()
}
)

describe("CocineroDB Tests", () => {
	it("Debería fallar si no se encuentra el restaurante", async () => {
		await assert.rejects(CocineroService.getCocineros(new Types.ObjectId()), { name: "NotFoundError" })
	})
	it("Debería devolver todos los cocineros", async () => {
		const cocineros = await CocineroService.getCocineros(restaurante._id)
		assert.strictEqual(cocineros.length, 1)
		assert.strictEqual(cocineros[0].ref.toString(), user._id.toString())
	})
	it("Debería crear un nuevo cocinero", async () => {
		const newUser = generateRandomUser()
		await CocineroService.createCocinero(restaurante._id, newUser)
		const updatedCocineros = await CocineroService.getCocineros(restaurante._id)
		assert.strictEqual(updatedCocineros.length, 2)
		await CocineroService.deleteCocinero(restaurante._id, newUser._id)

	})
	it("Debería eliminar un cocinero", async () => {
		await CocineroService.deleteCocinero(restaurante._id, user._id)
		const updatedCocineros = await CocineroService.getCocineros(restaurante._id)
		assert.strictEqual(updatedCocineros.length, 0)
	})
})
