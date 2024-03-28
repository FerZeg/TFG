import Restaurante from "../models/Restaurante.js"

export default class RestauranteService {
	static async findById(id, fields) {
		return Restaurante.findOne({ _id: id }, { __v: 0, ...fields})
	}
}