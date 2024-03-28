import express from "express"
import mainRouter from "./routes/v1/mainrouter.js"
const app = express()
import { UnauthorizedError, ValidationError, NotFoundError } from "./lib/Errors.js"

// middleware
app.use(express.json())

// routes
app.use("/api/v1", mainRouter)

// error handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	if(err instanceof UnauthorizedError) {
		return res.status(401).send({ message: "No estás autorizado" })
	}
	if(err instanceof ValidationError) {
		return res.status(400).send({ message: "Hay errores en los datos enviados", errors: err.errors })
	}
	if(err instanceof NotFoundError) {
		return res.status(404).send({ message: "No encontrado" })
	}
	res.status(500).send({ message: "Error en el servidor" })
	console.log("ERROR" + err.stack)
})

export default app