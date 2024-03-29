import { sign } from "../lib/JWT.js"
import AuthService from "../services/AuthService.js"

const loginController = async (req, res) => {
	const { email, password } = req.body
	const user = await AuthService.login({ email, password })
	if(user.type === "superadmin") {
		return res.json({ token: sign({ id: user.id, type: user.type }) })
	}
	const { role, restaurant } = await AuthService.getRoleAndRestaurant(user)
	const token = sign({ id: user.id, type: user.type, role, restauranteId: restaurant._id})
	res.json({ token })
}
export { loginController }