export const generatePedidos = (productos, n) => {
	const pedidos = []
	const estados = ["EN_PROCESO", "HECHO", "CANCELADO"]
	for(let i = 0; i < n; i++) {
		const pedido = {
			estado: estados[Math.floor(Math.random() * estados.length)],
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