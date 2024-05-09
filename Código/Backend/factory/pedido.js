import { ESTADOS_PEDIDO } from "../Models/Ticket.js"

export const generatePedidos = (productos, n) => {
	const pedidos = []
	for(let i = 0; i < n; i++) {
		const pedido = {
			estado: (() => {
				const estados = ESTADOS_PEDIDO
				const random = Math.random()
				if (random < 0.2) {
					return estados[0]
				} else {
					const index = Math.floor(Math.random() * (estados.length - 1)) + 1
					return estados[index]
				}
			}),
			productos: productos.map(producto => {
				return {
					nombre: producto.nombre,
					precio: producto.precio,
					cantidad: Math.floor(Math.random() * 5),
					categoria: producto.categoria,
				}
			}),
		}
		pedidos.push(pedido)
	}
	return pedidos
}