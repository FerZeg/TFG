import Restaurante from "../Models/Restaurante.js"
import { NotFoundError } from "../lib/Errors.js"
import Usuario from "../Models/Usuario.js"

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
			cocinero = cocinero instanceof Usuario ? cocinero : new Usuario(cocinero)
			await cocinero.save()
			restaurant.users.push({ref: cocinero._id, type: "cocinero"})
			await restaurant.save()
			return cocinero
		} catch (error) {
			throw new Error("Error al crear el usuario")
		}
	}
}

export default CocineroService