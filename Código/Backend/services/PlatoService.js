import mongoose from "mongoose"
import Restaurante from "../Models/Restaurante.js"
import { BadRequestError } from "../lib/Errors.js"

export default class PlatoService {
	static async deleteOne(req) {
		if(!mongoose.Types.ObjectId.isValid(req.params.platoId)) 
			throw new BadRequestError("El ID del plato no es válido")
		const result = await Restaurante.updateOne(
			{ _id: req.params.restauranteId },
			{ $pull: { platos: { _id: req.params.platoId } } }
		)
		if(result.nModified === 0) throw new Error("No se ha encontrado el plato con ese ID")
		return true
	}
	static async putPlato(req) {
		const { restauranteId, platoId } = req.params
		const data  = req.body
		const restaurant = await Restaurante.findById(restauranteId)
		if (!restaurant) throw new BadRequestError("No se ha encontrado el restaurante con ese ID")
		let plato = restaurant.platos.find(plato => plato._id == platoId)
		if (!plato) {
			plato = {
				...data,
				_id: new mongoose.Types.ObjectId(),
			}
			restaurant.platos.push(plato)
		} else {
			Object.assign(plato, data)
		}
		await restaurant.save()
		return plato
	}

	static async getPlatos(req) {
		const { restauranteId } = req.params
		const { active } = req.query
		const restaurant = await Restaurante.findById(restauranteId)
		if (!restaurant) throw new BadRequestError("No se ha encontrado el restaurante con ese ID")
		if (active !== undefined) {
			return restaurant.platos.filter(plato => plato.active)
		}
		return restaurant.platos
	}



}