import Restaurante from "../models/Restaurante.js"
import { NotFoundError } from "../lib/Errors.js"

export default class RestauranteService {
	static async findById(id, fields) {
		const restaurante = await Restaurante.findById(id, { __v: 0, ...fields })
		if(!restaurante) throw new NotFoundError("No se ha encontrado el restaurante")
		return restaurante
	}
	static async findOne(query, fields) {
		return Restaurante.findOne(query, { __v: 0, ...fields})
	}
	static async createOne(data) {
		return Restaurante.create(data)
	}
	static async updateOne(id, data) {
		return Restaurante.updateOne({ _id: id }, data)
	}
	static async deleteOne(id) {
		const result = Restaurante.deleteOne({ _id: id })
		if(result.deletedCount === 0) 
			throw new NotFoundError("No se ha encontrado el restaurante")
	}
}