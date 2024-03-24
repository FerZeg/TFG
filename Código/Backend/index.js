import express from "express"
import mainRouter from "./routes/mainrouter.js"
const app = express()
import { connectDB } from "./connection.js"
app.listen(3000, () => {
	console.log("El servidor está inicializado en el puerto 3000")
	connectDB()
})

// middleware
app.use(express.json())

// routes
app.use(mainRouter)

// error handling
app.use((err, _req, res, _next) => {
	if(err.name === "UnauthorizedError") {
		return res.status(401).send({ message: "No estás autorizado" })
	}
	if(err.name === "ValidationError") {
		return res.status(400).send({ message: "Hay errores en los datos enviados", errors: err.errors })
	}
	if(err.name === "NotFoundError") {
		return res.status(404).send({ message: "No encontrado" })
	}
	console.error(err.stack)
	res.status(500).send({ message: "Error en el servidor" })
})