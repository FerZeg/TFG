import CocineroService from "../services/CocineroService.js"

const getCocineros = async (req, res) => {
	const { restauranteId } = req.params
	const cocineros = await CocineroService.getCocineros(restauranteId)
	res.send(cocineros)
}

const postCocinero = async (req, res) => {
	const { restauranteId } = req.params
	const cocinero = req.body
	const newCocinero = await CocineroService.createCocinero(restauranteId, cocinero)
	res.send(newCocinero)
}

const deleteCocinero = async (req, res) => {
	const { restauranteId, cocineroId } = req.params
	await CocineroService.deleteCocinero(restauranteId, cocineroId)
	res.json({ message: "Cocinero eliminado"})
}

export { getCocineros, postCocinero, deleteCocinero }