import { BadRequestError } from "../lib/Errors.js"
import UserService from "../services/UserService.js"

const getUsers = async (req, res) => {
	const { restauranteId } = req.params
	const users = await UserService.getUsers(restauranteId)
	res.send(users)
}

const postUser = async (req, res) => {
	const { restauranteId } = req.params
	const cocinero = req.body
	const newCocinero = await UserService.createUser(restauranteId, cocinero)
	res.send(newCocinero)
}

const deleteUser = async (req, res) => {
	const { restauranteId, userId } = req.params
	if(userId === req.user.id) {
		throw new BadRequestError("No puedes eliminarte a ti mismo")
	}
	await UserService.deleteUser(restauranteId, userId)
	res.json({ message: "Usuario eliminado"})
}

export { getUsers, postUser, deleteUser }