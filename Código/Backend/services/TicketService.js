import Ticket from "../Models/Ticket.js"

export default class TicketService {
	static async getTicket(req) {
		if(req.params.id) {
			const ticket = await Ticket.findById(req.params.ticketId)
			if(!ticket) throw new Error("No se ha encontrado el ticket con ese ID")
			ticket.total = ticket.pedidos.reduce((acc, pedido) => {
				return acc + pedido.productos.reduce((acc, producto) => {
					return acc + producto.precio * producto.cantidad
				}, 0)
			}, 0)
			return ticket
		}
		const tickets = await Ticket.find()
		tickets.map(ticket => {
			ticket.total = ticket.pedidos.reduce((acc, pedido) => {
				return acc + pedido.productos.reduce((acc, producto) => {
					return acc + producto.precio * producto.cantidad
				}, 0)
			}, 0)
		})
		return tickets
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