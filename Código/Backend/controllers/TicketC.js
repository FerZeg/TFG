import TicketService from "../services/TicketService.js"

export const getTicket = async (req, res) => {
	if(!req.params.ticketId) {
		const result = await TicketService.getTickets(req)
		return res.send(result)
	}
	const result = await TicketService.getTicket(req)
	res.send(result)
}
export const deleteTicket = async (req, res) => {
	const result = await TicketService.deleteTicket(req)
	res.send(result)
}

export const getPendiente = async (req, res) => {
	const result = await TicketService.getProductosPendientes()
	res.send(result)
}