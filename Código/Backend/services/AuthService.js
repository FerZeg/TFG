import Usuario from "../Models/Usuario.js"
import Restaurante from "../Models/Restaurante.js"
import { UnauthorizedError, NotFoundError } from "../lib/Errors.js"

class AuthService {
	static async login({ email, password }) {
		if(!email || !password) throw new UnauthorizedError("Email y contraseña son requeridos")
		const user = await Usuario.findOne({email})
		if (!user) {
			throw new NotFoundError("No se ha encontrado el usuario")
		}
		if (!user.comparePassword(password)) {
			throw new UnauthorizedError("Contraseña incorrecta")
		}
		return user
	}
	static async getRoleAndRestaurant(user) {
		const restaurant = await Restaurante.findOne({ "users.ref": user._id })
		if (!restaurant) {
			throw new NotFoundError("No se ha encontrado el restaurante")
		}
		const role = restaurant.users.find(u => u.ref.equals(user._id)).type
		return { role, restaurant }
	}
	static async getUserData(id) {
		const user = await Usuario.findById(id, { contraseña: 0, __v: 0 })
		if (!user) {
			throw new NotFoundError("No se ha encontrado el usuario")
		}
		return user
	}
    
}
export default AuthService


    