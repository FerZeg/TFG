import Usuario from "../Models/Usuario.js"
import Restaurante from "../Models/Restaurante.js"
import { UnauthorizedError, NotFoundError } from "../lib/Errors.js"
import { BadRequestError } from "../lib/Errors.js"

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
		const restaurant = await Restaurante.findOne({ "users.user": user._id })
		if (!restaurant) {
			throw new NotFoundError("No se ha encontrado el restaurante")
		}
		const role = restaurant.users.find(u => u.user.equals(user._id)).role
		return { role, restaurant }
	}
	static async getUserData(id) {
		const user = await Usuario.findById(id, { contraseña: 0, __v: 0 })
		if (!user) {
			throw new NotFoundError("No se ha encontrado el usuario")
		}
		return user
	}
	static authenticateMesa = async (req) => {
		const { mesa, email, password } = req.body
		const user = await Usuario.findOne({ email })
		if (!user) throw new BadRequestError("No se ha encontrado el usuario")
		const restaurante = await Restaurante.findOne({ "users.user": user._id })
		if (!restaurante) throw new BadRequestError("No se ha encontrado el restaurante")
		const mesaResultado = restaurante.mesas.find(m => m.identificador === mesa)
		if (!mesaResultado) throw new BadRequestError("No se ha encontrado la mesa")
		if(!restaurante.compareMesaPassword(password)) throw new UnauthorizedError("Contraseña incorrecta")
		return {
			restauranteId: restaurante._id,
			mesa: mesaResultado
		}
	}

	static async getMesaData(req) {
		const restaurante = await Restaurante.findById(req.mesa.restauranteId)
		if (!restaurante) throw new NotFoundError("No se ha encontrado el restaurante")
		const mesa = restaurante.mesas.find(m => m._id.equals(req.mesa.id))
		return {
			restauranteId: restaurante._id,
			mesa
		}
	}

		
    
}
export default AuthService


    