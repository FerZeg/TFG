import mongoose from "mongoose"
export function connect () {
	mongoose.connect("mongodb://localhost:27017/mydatabase", { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => console.log("Server up and running!"))
		.catch((error) => console.log(error.message))
	mongoose.set("useFindAndModify", false)
    
}