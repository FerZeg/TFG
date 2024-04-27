import Ticket from "../Models/Ticket.js"

export default class TicketService {
	static async getTicket(req) {
		if(req.params.id) {
			const ticket = await Ticket.findById(req.params.id)
			if(!ticket) throw new Error("No se ha encontrado el ticket con ese ID")
			return ticket
		}
		const tickets = await Ticket.find()
		return tickets
	}
	static async deleteTicket(req) {
		const ticket = await Ticket.findById(req.params.id)
		if(!ticket) throw new Error("No se ha encontrado el ticket con ese ID")
		await ticket.delete()
		return { message: "Ticket eliminado" }
	}
}