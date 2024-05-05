import Usuario from "./Models/Usuario.js"
import Restaurante from "./Models/Restaurante.js"
import Ticket from "./Models/Ticket.js"
import {connectDB} from "./connection.js"
import generatePlatos from "./factory/plato.js"
await connectDB()
const user = new Usuario({
	nombre: "admin",
	contraseña: "admin",
	email: "admin@admin.com",
})
const cocinero = new Usuario({
	nombre: "cocinero",
	contraseña: "cocinero",
	email: "cocinero@cocinero.com",
})
const superadmin = new Usuario({
	nombre: "superadmin",
	contraseña: "superadmin",
	email: "superadmin@superadmin.com",
	type: "superadmin",
})
await user.save()
await cocinero.save()
await superadmin.save()
const restaurante = new Restaurante({
	nombre: "restaurante",
	direccion: "calle",
	telefono: "123456789",
	platos: generatePlatos(15),
	mesas: [
		{
			identificador: "mesa1",
			capacidad: 4,
		},
		{
			identificador: "mesa2",
			capacidad: 2,
		},
		{
			identificador: "mesa3",
			capacidad: 6,
		},
		{
			identificador: "mesa4",
		}
	],
	users: [
		{
			user: user._id,
			role: "admin",
		},
		{
			user: cocinero._id,
			role: "cocinero",
		},
	],
	contraseña_mesas: "1234",
})
await restaurante.save()
for(let i = 0; i < 25; i++){
	const nMesa = Math.floor(Math.random() * restaurante.mesas.length)
	const ticket = new Ticket({
		mesa: restaurante.mesas[nMesa].identificador,
		pedidos: [
			{
				nombre: "plato" + i,
				precio: Math.random() * 100,
			},
		],
		restauranteId: restaurante._id,
		estado: Math.random() > 0.5 ? "PAID" : "NOPAID",
	})
	await ticket.save()
}

console.log("Datos de ejemplo cargados")
process.exit(0)
