import Restaurante from "../Models/Restaurante.js"
import mongoose from "mongoose"
import { BadRequestError } from "../lib/Errors.js"

export default class MesaService {
	static async deleteOne(req) {
		if(!mongoose.Types.ObjectId.isValid(req.params.mesaId)) 
			throw new BadRequestError("El ID de la mesa no es válido")
		const result = await Restaurante.updateOne(
			{ _id: req.params.restauranteId },
			{ $pull: { mesas: { _id: req.params.mesaId } } }
		)
		if(result.nModified === 0) throw new Error("No se ha encontrado la mesa con ese ID")
		return true
	}

	static putMesas = async (req) => {
		const { restauranteId, mesaId } = req.params
		const data  = req.body
		const restaurant = await Restaurante.findById(restauranteId)
		if (!restaurant) throw new BadRequestError("No se ha encontrado el restaurante con ese ID")
		let mesa = restaurant.mesas.find(mesa => mesa._id == mesaId)
		if (!mesa) {
			mesa = {
				...data,
				_id: new mongoose.Types.ObjectId(),
			}
			restaurant.mesas.push(mesa)
		} else {
			Object.assign(mesa, data)
		}
		await restaurant.save()
    
		return mesa._id
	}

}
    
