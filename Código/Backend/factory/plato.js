export default function generatePlatos(n) {
	const platos = []
	const tipos = ["plato", "bebida", "postre"]
	const ingredientes = [
		{
			tipo: "plato",
			"ingredientes": ["harina", "agua", "sal", "levadura"]
		},
		{
			tipo: "bebida",
			"ingredientes": ["agua", "azucar", "limon"]
		},
		{
			tipo: "postre",
			"ingredientes": ["harina", "agua", "sal", "levadura"]
		}
	]
	for(let i = 0; i < n; i++) {
		const tipo = tipos[Math.floor(Math.random() * tipos.length)]
		const ingrediente = ingredientes.find(ingrediente => ingrediente.tipo === tipo)
		const plato = {
			nombre: tipo + " " + i,
			precio: 10,
			tipo: tipo,
			ingredientes: ingrediente.ingredientes,
			active: Math.random() > 0.5 ? true : false,
		}
		platos.push(plato)
	}
	return platos
}