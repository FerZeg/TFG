import mongoose from "mongoose"
export async function connectDB () {
	try {
		await mongoose.connect(process.env.DB_URL)
		console.log("Base de datos conectada")
	} catch (error) {
		console.log(error.message)
	}
}
export async function disconnectDB () {
	mongoose.disconnect()
		.then(() => console.log("Base de datos desconectada"))
		.catch((error) => console.log(error.message))
}