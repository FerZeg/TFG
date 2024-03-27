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
	users: [{ref: "Usuario", type: Schema.Types.ObjectId}],
	contraseña_mesas: {
		type: String,
		required: true,
		set: v => bcrypt.hashSync(v, 10),
	},
	cocineros: [{ref: "Cocinero", type: Schema.Types.ObjectId}],
	createdDate: {
		type: Date,
		default: Date.now,
	},
	lastModifiedDate: {
		type: Date,
		default: Date.now,
	},
})
RestauranteSchema.pre("updateOne", function(next) {
	this.lastModifiedDate = Date.now()
	next()
})

export default model("Restaurante", RestauranteSchema)