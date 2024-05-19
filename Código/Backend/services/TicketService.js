import Ticket from "../Models/Ticket.js"
import { BadRequestError } from "../lib/Errors.js"

export default class TicketService {
	static getTotal(ticket) {
		return ticket.pedidos.reduce((acc, pedido) => {
			return acc + pedido.productos.reduce((acc, producto) => {
				return acc + producto.precio * producto.hechos
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
		/*const query = req.query
		const params = {
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
	static async getProductosPendientes() {
		const tickets = await Ticket.find({ estado: "ABIERTO" })
		const productosPendientes = tickets.map(ticket => {
			return ticket.pedidos.map(pedido => {
				const productos = pedido.productos.filter(producto => producto.estado === "EN_PROCESO")
				return productos.map(producto => {
					return {
						...producto.toObject(),
						ticketId: ticket._id,
						pedidoId: pedido._id,
					}
				})
			})
		})
		return productosPendientes.flat(2)
	}
	static async searchProduct(req) {
		const { ticketId } = req.params
		const { pedidoId, productoId } = req.body
		const ticket = await Ticket.findById(ticketId)
		if(!ticket) throw new BadRequestError("No se ha encontrado el ticket con ese ID")
		const pedido = ticket.pedidos.id(pedidoId)
		if(!pedido) throw new BadRequestError("No se ha encontrado el pedido con ese ID")
		const producto = pedido.productos.id(productoId)
		if(!producto) throw new BadRequestError("No se ha encontrado el producto con ese ID")
		return {
			ticket,
			pedido,
			producto
		}
	}

	static async updateProductStatus(req) {
		const { estado } = req.body
		const { producto, ticket } = await this.searchProduct(req)
		producto.estado = estado
		await ticket.save()
		return producto
	}
	static async updateProductQuantity(req) {
		const { hecho } = req.body
		const { producto, ticket } = await this.searchProduct(req)
		if(hecho <= 0) throw new BadRequestError("La cantidad hecha debe ser mayor a 0")
		if(producto.hechos + hecho > producto.cantidad) throw new BadRequestError("La cantidad hecha no puede ser mayor a la cantidad total")
		if(producto.estado !== "EN_PROCESO") throw new BadRequestError("El producto no está en proceso")
		if(producto.hechos + hecho === producto.cantidad) producto.estado = "HECHO"
		producto.hechos += hecho
		await ticket.save()
		return producto
	}

	static async createPedido(req) {
		const { ticketId } = req.params
		const { productos } = req.body
		const ticket = await Ticket.findById(ticketId).populate("restauranteId")
		if(!ticket) throw new BadRequestError("No se ha encontrado el ticket con ese ID")
		if(ticket.estado !== "ABIERTO") throw new BadRequestError("El ticket no está abierto")
		const pedido = {
			productos: productos.map(producto => {
				const productoEncontrado = ticket.restauranteId.platos.id(producto.plato)
				return {
					...productoEncontrado.toObject(),
					estado: "EN_PROCESO",
					hechos: 0,
					cantidad: producto.cantidad,
				}
			})
		}
		ticket.pedidos.push(pedido)
		await ticket.save()
		return pedido
	}
}