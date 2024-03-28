import { NotFoundError } from "../lib/Errors.js"
import RestauranteService from "../services/RestauranteService.js"

const getRestaurante = async (req, res) => {
	const id = req.params.id
	if(!id) throw new NotFoundError("No se ha encontrado el restaurante")
	const restaurante = await RestauranteService.findById(id)
	if(!restaurante) throw new NotFoundError("No se ha encontrado el restaurante")
	res.json(restaurante)

}

export { getRestaurante }