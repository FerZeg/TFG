import { ESTADOS_PEDIDO } from "../Models/Ticket.js"

export const generatePedidos = (estadoTicket, productos, n) => {
	const pedidos = []
	for(let i = 0; i < n; i++) {
		const pedido = {
			productos: productos.map(producto => {
				const cantidad = Math.floor(Math.random() * 3) + 1
				return {
					nombre: producto.nombre,
					estado: getRandomEstado(ESTADOS_PEDIDO),
					precio: producto.precio,
					cantidad,
					categoria: producto.categoria,
					tipo: producto.tipo,
					hechos: estadoTicket === "ABIERTO" ? 0 : cantidad,
				}
			}),
		}
		pedidos.push(pedido)
	}
	return pedidos
}

function getRandomEstado(estados) {
	const random = Math.random()
	if (random < 0.2) {
		return estados[0]
	} else {
		const index = Math.floor(Math.random() * (estados.length - 1)) + 1
		return estados[index]
	}
}