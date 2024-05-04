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
		const tipo = Math.floor(Math.random() * tipos.length)
		const ingrediente = ingredientes.find(ingrediente => ingrediente.tipo === tipos[tipo])
		const plato = {
			nombre: `plato${i}`,
			precio: 10,
			tipo: tipos[tipo],
			ingredientes: ingrediente.ingredientes,
		}
		platos.push(plato)
	}
	return platos
}