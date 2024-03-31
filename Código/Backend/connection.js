import mongoose from "mongoose"
export async function connectDB () {
	try {
		await mongoose.connect(process.env.DB_URL)
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