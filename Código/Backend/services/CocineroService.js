import Restaurante from "../models/Restaurante.js"
import { NotFoundError } from "../lib/Errors.js"

class CocineroService {
	static async getCocineros(restauranteId) {
		const restaurant = await Restaurante.findById(restauranteId)
		if (!restaurant) {
			throw new NotFoundError("No se ha encontrado el restaurante")
		}
		const users = restaurant.users
		return users.filter(user => user.type === "cocinero")

	}
}

export default CocineroService