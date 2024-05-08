export const generateMesas = (n) => {
	const mesas = []
	for(let i = 0; i < n; i++) {
		const mesa = {
			identificador: "Mesa " + (i + 1),
			capacidad: Math.floor(Math.random() * 10),
			estado: Math.random() > 0.5 ? "LIBRE" : "OCUPADA",
		}
		mesas.push(mesa)
	}
	return mesas
}