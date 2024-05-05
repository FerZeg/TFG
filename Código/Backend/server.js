import app from "./index.js"
import { connectDB } from "./connection.js"

app.listen(process.env.PORT, () => {
	console.log("El servidor está inicializado en el puerto " + process.env.PORT)
	connectDB()
})