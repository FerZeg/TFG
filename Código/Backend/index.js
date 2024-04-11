import express from "express"
import mainRouter from "./routes/v1/mainrouter.js"
const app = express()
import { UnauthorizedError, ValidationError, NotFoundError, BadRequestError } from "./lib/Errors.js"
import cors from "cors"

app.use(cors({
	origin: process.env.MODE == "development" 
		? ["http://localhost:5173"] 
		: ["https://admin.comidaenmarcha.com", "https://comidaenmarcha.com", "https://cocina.comidaenmarcha.com"]
}))

// middleware
app.use(express.json())

app.get("/", (req, res) => {
	res.send("API Cocina en Marcha")
})

// routes
app.use("/api/v1", mainRouter)

// error handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	if(err instanceof UnauthorizedError) {
		return res.status(401).send({ message: err.message })
	}
	if(err instanceof ValidationError) {
		return res.status(400).send({ message: "Hay errores en los datos enviados", errors: err.errors })
	}
	if(err instanceof NotFoundError) {
		return res.status(404).send({ message: err.message })
	}
	if(err instanceof BadRequestError) {
		return res.status(400).send({ message: err.message })
	}
	res.status(500).send({ message: "Error en el servidor" })
	console.log("ERROR" + err.stack)
})

export default app