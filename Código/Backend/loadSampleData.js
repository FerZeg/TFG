import Usuario from "./Models/Usuario.js"
import Restaurante from "./Models/Restaurante.js"
import Ticket from "./Models/Ticket.js"
import {connectDB} from "./connection.js"
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
	users: [
		{
			ref: user._id,
			type: "admin",
		},
		{
			ref: cocinero._id,
			type: "cocinero",
		},
	],
	contraseña_mesas: "1234",
})
const ticket = new Ticket({
	mesa: restaurante.mesas[0].identificador,
	pedidos: [
		{
			nombre: "plato1",
			precio: 10,
		},
	],
	restauranteId: restaurante._id,
	estado: "PAID",

})
await restaurante.save()
await ticket.save()
console.log("Datos de ejemplo cargados")
process.exit(0)
