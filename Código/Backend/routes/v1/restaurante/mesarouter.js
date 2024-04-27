import { Router } from "express"
import MesaService from "../../../services/MesaService.js"

const mesasRouter = Router({ mergeParams: true })

mesasRouter.delete("/:mesaId", (req, res, next) => {
	MesaService.deleteOne(req)
		.then(() => res.send("Mesa eliminada"))
		.catch(err => next(err))
})
mesasRouter.put("/:mesaId", (req, res, next) => {
	MesaService.putMesas(req)
		.then((result) => res.send({ message: "Mesa actualizada", _id: result._id}))
		.catch(err => next(err))
})

export default mesasRouter