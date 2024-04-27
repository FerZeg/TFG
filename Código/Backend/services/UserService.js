import Restaurante from "../Models/Restaurante.js"
import { NotFoundError } from "../lib/Errors.js"
import Usuario from "../Models/Usuario.js"
import mongoose from "mongoose"

class UserService {
	static async getUsers(restauranteId) {
		const restaurant = await Restaurante.findById(restauranteId, { users: 1 }).populate("users.user")
		if (!restaurant) {
			throw new NotFoundError("No se ha encontrado el restaurante")
		}
		return restaurant.users
	}
	// TODO: Mejorar la lógica de actualización de usuario
	static async updateUser(req) {
		const { restauranteId, userId } = req.params
		const user  = req.body
		if (!restauranteId || !userId || !user) {
			throw new Error("restauranteId, userId y user son requeridos")
		}
		const restaurant = await Restaurante.findById(restauranteId, { users: 1 })
		if (!restaurant) {
			throw new NotFoundError("No se ha encontrado el restaurante")
		}
		const userIndex = restaurant.users.findIndex(user => user.user == userId)
		if (userIndex === -1) {
			throw new NotFoundError("No se ha encontrado el usuario")
		}
		const userToUpdate = restaurant.users[userIndex]
		userToUpdate.role = user.role
		await restaurant.save()
		const userToUpdateDoc = await Usuario.findById(userId)
		userToUpdateDoc.set(user)
		await userToUpdateDoc.save()
		return userToUpdate
	}
	static async createUser(req) {
		const { restauranteId } = req.params
		const  user = req.body
		if (!restauranteId || !user) {
			throw new Error("restauranteId y user son requeridos")
		}
		const session = await mongoose.startSession()
		session.startTransaction()
		try {
			const restaurant = await Restaurante.findById(restauranteId, { users: 1 }).session(session)
			if (!restaurant) {
				throw new NotFoundError("No se ha encontrado el restaurante")
			}
			user._id = undefined
			user.contraseña = user.password
			const newUser = new Usuario({
				...user
			})
			await newUser.save({ session })
			restaurant.users.push({ user: newUser._id, role: newUser.role })
			await restaurant.save({ session })
			await session.commitTransaction()
			session.endSession()
			return newUser
		} catch (error) {
			await session.abortTransaction()
			session.endSession()
			console.log(error)
			throw new Error("Error al crear el usuario")
		}
	}
	// TODO: Implementar transacción en caso de errores
	static async deleteUser(restauranteId, userId) {
		if (!restauranteId || !userId) {
			throw new Error("restauranteId y userId son requeridos")
		}
		const restaurante = await Restaurante.findById(restauranteId, { users: 1 })
		if (!restaurante) {
			throw new NotFoundError("No se ha encontrado el restaurante")
		}
		restaurante.users = restaurante.users.filter(user => user.user.toString() != userId)
		await restaurante.save()
		await Usuario.deleteOne({ _id: userId })
	}
}

export default UserService