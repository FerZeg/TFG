import mongoose from "mongoose"
const { Schema, model, models } = mongoose

import bcrypt from "bcrypt"

const UserSchema = new Schema({
	nombre: {
		type: String,
		required: true,
	},
	contraseña: {
		type: String,
		required: true,
		set: v => bcrypt.hashSync(v, 10),
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
	lastModifiedDate: {
		type: Date,
		default: Date.now,
	},
	type: {
		type: String,
		enum: ["normal", "superadmin"],
		default: "normal",
	},
})

UserSchema.pre("updateOne", function(next) {
	this.lastModifiedDate = Date.now()
	next()
})

UserSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.contraseña)
}

UserSchema.index({ email: 1 })

export default models.Usuario || model("Usuario", UserSchema)

