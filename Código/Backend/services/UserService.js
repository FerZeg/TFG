import Restaurante from "../Models/Restaurante.js"
import { NotFoundError } from "../lib/Errors.js"
import Usuario from "../Models/Usuario.js"

class UserService {
	static async getUsers(restauranteId) {
		const restaurant = await Restaurante.findById(restauranteId, { users: 1 })
		if (!restaurant) {
			throw new NotFoundError("No se ha encontrado el restaurante")
		}
		return restaurant.users
	}
	static async createUser(restauranteId, user, type = "cocinero") {
		if (!restauranteId || !user) {
			throw new Error("restauranteId y user son requeridos")
		}
		const restaurant = await Restaurante.findById(restauranteId, { users: 1 })
		if (!restaurant) {
			throw new NotFoundError("No se ha encontrado el restaurante")
		}
		try {
			user = user instanceof Usuario ? user : new Usuario(user)
			await user.save()
			restaurant.users.push({ref: user._id, type})
			await restaurant.save()
			return user
		} catch (error) {
			throw new Error("Error al crear el usuario")
		}
	}
	static async deleteUser(restauranteId, userId) {
		if (!restauranteId || !userId) {
			throw new Error("restauranteId y userId son requeridos")
		}
		const restaurante = await Restaurante.findById(restauranteId, { users: 1 })
		if (!restaurante) {
			throw new NotFoundError("No se ha encontrado el restaurante")
		}
		restaurante.users = restaurante.users.filter(user => user.ref.toString() != userId)
		await restaurante.save()
		await Usuario.deleteOne({ _id: userId })
	}
}

export default UserService