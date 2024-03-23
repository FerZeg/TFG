import mongoose from "mongoose"
export function connectDB () {
	mongoose.connect(process.env.DB_URL)
		.then(() => console.log("Base de datos conectada"))
		.catch((error) => console.log(error.message))
    
}