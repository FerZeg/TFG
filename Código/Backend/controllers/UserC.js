import { BadRequestError } from "../lib/Errors.js"
import UserService from "../services/UserService.js"

const getUsers = async (req, res) => {
	const { restauranteId } = req.params
	const users = await UserService.getUsers(restauranteId)
	res.send(users)
}

const postUser = async (req, res) => {
	const newCocinero = await UserService.createUser(req)
	res.send(newCocinero)
}

const putUser = async (req, res) => {
	const updatedUser = await UserService.updateUser(req)
	res.send(updatedUser)
}

const deleteUser = async (req, res) => {
	const { restauranteId, userId } = req.params
	if(userId === req.user.id) {
		throw new BadRequestError("No puedes eliminarte a ti mismo")
	}
	await UserService.deleteUser(restauranteId, userId)
	res.json({ message: "Usuario eliminado"})
}

export { getUsers, postUser, deleteUser, putUser }