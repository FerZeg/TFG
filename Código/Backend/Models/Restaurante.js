import { Schema, model } from "mongoose"
import { bcrypt } from "bcrypt"

const RestauranteSchema = new Schema({
	nombre: {
		type: String,
		required: true,
	},
	direccion: String,
	telefono: String,
	platos: [{
		nombre: String,
		precio: Number,  
		tipo: String,
		ingredientes: [String],
	}],
	mesas: [{
		identificador: String,
		estado: {
			type: String,
			default: "LIBRE",
			enum: ["LIBRE", "OCUPADA"],
		}
	}],
	contraseña: {
		type: String,
		required: true,
		set: v => bcrypt.hashSync(v, 10),
	},
	contraseña_mesas: {
		type: String,
		required: true,
		set: v => bcrypt.hashSync(v, 10),
	},
	cocineros: [{
		nombre: String,
		contraseña: {
			type: String,
			set: v => bcrypt.hashSync(v, 10),
		},
	}]
})

export default model("Restaurante", RestauranteSchema)