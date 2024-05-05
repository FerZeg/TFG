import mongoose from "mongoose"
const { Schema, model, models } = mongoose

import bcrypt  from "bcrypt"

const RestauranteSchema = new Schema({
	nombre: {
		type: String,
		required: true,
	},
	direccion: String,
	telefono: String,
	platos: [{
		nombre: {
			type: String,
			required: true,
		},
		precio: {
			type: Number,
			default: 0,
		},
		tipo: {
			type: String,
			required: true,
		},
		ingredientes: [String],
		active: {
			default: true,
			type: Boolean,
		},
		imagen: {
			type: String,
		},
	}],
	mesas: [{
		identificador: {
			type: String,
			required: true,
			unique: true,
		},
		estado: {
			type: String,
			default: "LIBRE",
			enum: ["LIBRE", "OCUPADA"],
		},
		capacidad: {
			type: Number,
			default: 4,
		},
	}],
	users: [{
		user: {type: Schema.Types.ObjectId, ref: "Usuario" },
		role: {
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
RestauranteSchema.index({ "users.user": 1 })

export default models.Restaurante || model("Restaurante", RestauranteSchema)