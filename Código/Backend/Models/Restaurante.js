import { Schema, model } from "mongoose"
import bcrypt  from "bcrypt"

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
		},
	}],
	users: [{
		ref: {type: Schema.Types.ObjectId, ref: "Usuario" },
		type: {
			type: String,
			default: "cocinero",
			enum: ["cocinero", "admin"],
		},
		_id: false,
	}],
	contraseña_mesas: {
		type: String,
		required: true,
		set: v => bcrypt.hashSync(v, 10),
	},
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
RestauranteSchema.methods.compareMesaPassword = function(password) {
	return bcrypt.compareSync(password, this.contraseña_mesas)
}
RestauranteSchema.index({ "users.ref": 1 })

export default model("Restaurante", RestauranteSchema)