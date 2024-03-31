import Restaurante from "../models/Restaurante.js"
import { NotFoundError } from "../lib/Errors.js"
import User from "../models/User.js"

class CocineroService {
	static async getCocineros(restauranteId) {
		const restaurant = await Restaurante.findById(restauranteId)
		if (!restaurant) {
			throw new NotFoundError("No se ha encontrado el restaurante")
		}
		const users = restaurant.users
		return users.filter(user => user.type === "cocinero")
	}
	static async createCocinero(restauranteId, cocinero) {
		if (!restauranteId || !cocinero) {
			throw new Error("restauranteId y cocinero son requeridos")
		}
		const restaurant = await Restaurante.findById(restauranteId, { users: 1 })
		if (!restaurant) {
			throw new NotFoundError("No se ha encontrado el restaurante")
		}
		try {
			const user = await User.create(cocinero)
			restaurant.users.push({ref: user._id, type: "cocinero"})
			await restaurant.save()
			return user
		} catch (error) {
			throw new Error("Error al crear el usuario")
		}
	}
}

export default CocineroService