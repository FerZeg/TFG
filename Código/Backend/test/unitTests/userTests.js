import { before, after, describe, it} from "node:test"
import { disconnectDB} from "../../connection.js"
import { connectDB } from "../../connection.js"
import UserService from "../../services/UserService.js"
import { generateRandomRestaurant, generateRandomUser } from "../data/generateData.js"
import assert from "node:assert"
import { Types } from "mongoose"

let restaurante = generateRandomRestaurant()
let user = generateRandomUser()
before(async() => {
	await connectDB()
	await user.save()
	restaurante.users.push({user: user._id, role: "cocinero"})
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
		await assert.rejects(UserService.getUsers(new Types.ObjectId()), { name: "NotFoundError" })
	})
	it("Debería devolver todos los cocineros", async () => {
		const users = await UserService.getUsers(restaurante._id)
		assert.strictEqual(users.length, 1)
		assert.strictEqual(users[0].user._id.toString(), user._id.toString())
	})
	it("Debería crear un nuevo cocinero", async () => {
		const newUser = generateRandomUser()
		await UserService.createUser(restaurante._id, newUser)
		const updatedUser = await UserService.getUsers(restaurante._id)
		assert.strictEqual(updatedUser.length, 2)
		await UserService.deleteUser(restaurante._id, newUser._id)

	})
	it("Debería eliminar un cocinero", async () => {
		await UserService.deleteUser(restaurante._id, user._id)
		const updatedUsers = await UserService.getUsers(restaurante._id)
		assert.strictEqual(updatedUsers.length, 0)
	})
})
