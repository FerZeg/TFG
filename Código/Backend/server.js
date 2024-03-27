import app from "./index.js"
import { connectDB } from "./connection.js"
app.listen(3000, () => {
	console.log("El servidor está inicializado en el puerto 3000")
	connectDB()
})