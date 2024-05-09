import Ticket from "../Models/Ticket.js"

export default class TicketService {
	static getTotal(ticket) {
		return ticket.pedidos.reduce((acc, pedido) => {
			return acc + pedido.productos.reduce((acc, producto) => {
				return acc + producto.precio * producto.cantidad
			}, 0)
		}, 0)
	}
	static async getTicket(req) {
		const ticket = await Ticket.findById(req.params.ticketId)
		if(!ticket) throw new Error("No se ha encontrado el ticket con ese ID")
		ticket.total = this.getTotal(ticket)
		return ticket
	}
	static async getTickets(req) {
		const query = req.query
		/*const params = {
			estado: query.estado ? 1 : 0,
			restauranteId: query.restauranteId,
			mesa: query.mesa,
		}*/
		const tickets = await Ticket.find()
		const ticketsWithTotal = tickets.map(ticket => {
			const ticketWithTotal = ticket.toObject()
			ticketWithTotal.total = this.getTotal(ticket)
			return ticketWithTotal
		})
		return ticketsWithTotal
	}
	static async deleteTicket(req) {
		const ticket = await Ticket.deleteOne({ _id: req.params.ticketId })
		if(ticket.deletedCount === 0) {
			throw new Error("No se ha encontrado el ticket con ese ID")
		}
		return { message: "Ticket eliminado" }
	}
	static async putPedido(req) {
		const ticket = await Ticket.findById(req.params.ticketId)
		if(!ticket) throw new Error("No se ha encontrado el ticket con ese ID")
		const pedido = req.body
		ticket.pedidos.push(pedido)
		await ticket.save()
		return ticket
	}
}