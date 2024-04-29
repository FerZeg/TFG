import Ticket from "../Models/Ticket.js"

export default class TicketService {
	static async getTicket(req) {
		if(req.params.id) {
			const ticket = await Ticket.findById(req.params.ticketId)
			if(!ticket) throw new Error("No se ha encontrado el ticket con ese ID")
			return ticket
		}
		const tickets = await Ticket.find()
		return tickets
	}
	static async deleteTicket(req) {
		const ticket = await Ticket.deleteOne({ _id: req.params.ticketId })
		if(ticket.deletedCount === 0) {
			throw new Error("No se ha encontrado el ticket con ese ID")
		}
		return { message: "Ticket eliminado" }
	}
}