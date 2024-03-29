import { NotFoundError } from "../lib/Errors.js"
import RestauranteService from "../services/RestauranteService.js"

const getRestaurante = async (req, res) => {
	const restaurantId = req.params.restauranteId
	if(!restaurantId) throw new NotFoundError("No se ha encontrado el restaurante")
	const restaurante = await RestauranteService.findById(restaurantId)
	res.json(restaurante)
}

const createRestaurante = async (req, res) => {
	const restaurante = await RestauranteService.createOne(req.body)
	res.json({message: "Restaurante creado", restaurante})
}

const deleteRestaurante = async (req, res) => {
	const restauranteId = req.params.restauranteId
	if(!restauranteId) throw new NotFoundError("No se ha encontrado el restaurante")
	await RestauranteService.deleteOne(restauranteId)
	res.json({message: "Restaurante eliminado"})
}

export { getRestaurante, createRestaurante, deleteRestaurante }