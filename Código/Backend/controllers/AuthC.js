import { sign, signMesa } from "../lib/JWT.js"
import AuthService from "../services/AuthService.js"

export const loginController = async (req, res) => {
	const { email, password } = req.body
	const user = await AuthService.login({ email, password })
	if(user.type === "superadmin") {
		return res.json({ token: sign({ id: user.id, type: user.type }) })
	}
	const { role, restaurant } = await AuthService.getRoleAndRestaurant(user)
	const token = sign({ id: user.id, type: user.type, role, restauranteId: restaurant._id})
	res.json({ token })
}
export const dataController = async (req, res) => {
	const user = req.user
	const data = await AuthService.getUserData(user.id)
	res.json({data, role: user.role, restauranteId: user.restauranteId})
}
export const authenticateMesa = async (req, res) => {
	const result = await AuthService.authenticateMesa(req)
	res.json({ token: signMesa({ id: result.mesa._id, restauranteId: result.restauranteId }) })
}
export const getMesaData = async (req, res) => {
	const data = await AuthService.getMesaData(req)
	res.json(data)
}