import Restaurante from "../models/Restaurante.js"

export default class RestauranteService {
	static async findById(id) {
		return Restaurante.findOne({ _id: id }, { __v: 0, users: 0, contraseña_mesas: 0, cocineros: 0 })
	}
}