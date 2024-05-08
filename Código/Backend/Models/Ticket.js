import mongoose from "mongoose"
const { Schema, model, models } = mongoose

export const PedidoSchema = new Schema({
	estado: {
		type: String,
		default: "EN_PROCESO",
		enum: ["EN_PROCESO", "HECHO", "CANCELADO"],
	},
	productos: [{
		nombre: String,
		precio: Number,
		cantidad: Number,
		_id: false,
		categoria: String,
	}],
	createdDate: {
		type: Date,
		default: Date.now,
	}
})


const TicketSchema = new Schema({
	pedidos: [
		PedidoSchema
	],
	estado: {
		type: String,
		default: "ABIERTO",
		enum: ["ABIERTO", "CERRADO", "CANCELADO"],
	},
	restauranteId: Schema.Types.ObjectId,
	mesa: {
		type: String,
		required: true,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
})


export default models.Ticket || model("Ticket", TicketSchema)