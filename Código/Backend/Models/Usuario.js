import { Schema, model } from "mongoose"
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

export default model("Usuario", UserSchema)

