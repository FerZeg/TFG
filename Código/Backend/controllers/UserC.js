import UserService from "../services/UserService.js"

const getUser = async (req, res) => {
	const { userId } = req.params
	const cocineros = await UserService.getCocineros(userId)
	res.send(cocineros)
}

const postUser = async (req, res) => {
	const { restauranteId } = req.params
	const cocinero = req.body
	const newCocinero = await UserService.createCocinero(restauranteId, cocinero)
	res.send(newCocinero)
}

const deleteUser = async (req, res) => {
	const { restauranteId, userId } = req.params
	await UserService.deleteCocinero(restauranteId, userId)
	res.json({ message: "Usuario eliminado"})
}

export { getUser, postUser, deleteUser }