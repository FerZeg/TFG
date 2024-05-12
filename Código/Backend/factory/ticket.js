import { generatePedidos } from "./pedido.js"
import { ESTADOS_TICKET } from "../Models/Ticket.js"

export default function generateTickets(mesa, productos, restauranteId, n) {
	const tickets = []
	for(let i = 0; i < n; i++) {
		const estadoTicket = ESTADOS_TICKET[Math.floor(Math.random() * ESTADOS_TICKET.length)]
		const ticket = {
			mesa: mesa.identificador,
			estado: estadoTicket,
			pedidos: generatePedidos(estadoTicket, productos, Math.floor(Math.random() * 5) + 1),
			restauranteId: restauranteId,
		}
		tickets.push(ticket)
	}
	return tickets
}