import User from "../../Models/Usuario.js"
import Restaurante from "../../Models/Restaurante.js"

const generateRandomUser = (type = "normal") => {
	return new User({
		nombre: "John Doe",
		email: Math.random().toString(36).substring(7) + "@example.com",
		contraseña: "password",
		type
	})
}
const generateRandomRestaurant = () => {
	return  new Restaurante({
		nombre: "restaurante",
		direccion: "calle",
		telefono: "123456789",
		platos: [
			{
				nombre: "plato1",
				precio: 10,
				tipo: "tipo1",
				ingredientes: ["ingrediente1", "ingrediente2"],
			},
		],
		mesas: [
			{
				identificador: "mesa1",
			},
		],
		contraseña_mesas: "1234",
	})
}


export {
	generateRandomUser,
	generateRandomRestaurant
}