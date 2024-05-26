import Usuario from "./Models/Usuario.js"
import Restaurante from "./Models/Restaurante.js"
import Ticket from "./Models/Ticket.js"
import {connectDB} from "./connection.js"
import generatePlatos from "./factory/plato.js"
import { generateMesas } from "./factory/mesas.js"
import generateTickets from "./factory/ticket.js"
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

const platos = generatePlatos(15)
const mesas = generateMesas(5)

const restaurante = new Restaurante({
	nombre: "Gaeguri",
	direccion: "calle",
	telefono: "123456789",
	platos: platos,
	mesas: mesas,
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

console.log("Generando tickets")
let tickets = []
for(let i = 0; i < mesas.length; i++) {
	const mesa = restaurante.mesas[i]
	tickets.push(...generateTickets(mesa, platos, restaurante._id, Math.floor(Math.random() * 5) + 1))
}
console.log(tickets)
await Ticket.insertMany(tickets)

console.log("Datos de ejemplo cargados")
process.exit(0)
