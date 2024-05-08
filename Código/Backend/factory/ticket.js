import { generatePedidos } from "./pedido.js"

export default function generateTickets(mesa, productos, restauranteId, n) {
	const tickets = []
	for(let i = 0; i < n; i++) {
		const ticket = {
			mesa: mesa.identificador,
			estado: "ABIERTO",
			pedidos: generatePedidos(productos, Math.floor(Math.random() * 5) + 1),
			restauranteId: restauranteId,
		}
		tickets.push(ticket)
	}
	console.log(tickets)
	return tickets
}