import express from "express"
const app = express()
import { connect } from "mongoose"
app.listen(3000, () => {
	console.log("El servidor está inicializado en el puerto 3000")
	connect()
})