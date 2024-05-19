import MesaService from "../services/MesaService.js"

export const deleteMesa =  (req, res, next) => {
	MesaService.deleteOne(req)
		.then(() => res.send("Mesa eliminada"))
		.catch(err => next(err))
}
export const putMesa = (req, res, next) => {
	MesaService.putMesas(req)
		.then((result) => res.send({ message: "Mesa actualizada", _id: result._id}))
		.catch(err => next(err))
}

export const createTicket = async (req, res) => {
	const result = await MesaService.createTicket(req)
	res.send({ message: "Ticket creado", _id: result})
}