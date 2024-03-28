import { NotFoundError } from "../lib/Errors.js"
import RestauranteService from "../services/RestauranteService.js"

const getRestaurante = async (req, res) => {
	const restaurantId = req.params.restauranteId
	if(!restaurantId) throw new NotFoundError("No se ha encontrado el restaurante")
	const restaurante = await RestauranteService.findById(restaurantId)
	if(!restaurante) throw new NotFoundError("No se ha encontrado el restaurante")
	res.json(restaurante)
}

export { getRestaurante }