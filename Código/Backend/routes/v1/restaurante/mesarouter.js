import { Router } from "express"
const mesasRouter = Router({ mergeParams: true })

mesasRouter.delete("/:mesaId", (req, res) => {
	res.send("Mesa eliminada")
})
mesasRouter.put("/:mesaId", (req, res) => {
	res.send("Mesa actualizada")
})

export default mesasRouter