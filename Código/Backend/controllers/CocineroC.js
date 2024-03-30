import CocineroService from "../services/CocineroService.js"

const getCocineros = async (req, res) => {
	const { restauranteId } = req.params
	const cocineros = await CocineroService.getCocineros(restauranteId)
	res.send(cocineros)
}

export { getCocineros }