import mongoose from "mongoose"
export async function connectDB () {
	try {
		await mongoose.connect(process.env.DB_URL)
		mongoose.connection.on("disconnected", () => {
			console.log("MongoDB disconnected")
		})

		mongoose.connection.on("error", err => {
			console.log("MongoDB connection error: ", err)
		})
	} catch (error) {
		console.log(error)
	}
}
export async function disconnectDB () {
	try {
		await mongoose.disconnect()
	} catch (error) {
		console.log(error.message)
	}
}