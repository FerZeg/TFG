import mongoose from "mongoose"
const { Schema, model, models } = mongoose

export const ESTADOS_TICKET = ["ABIERTO", "CERRADO", "CANCELADO"]
export const ESTADOS_PEDIDO = ["EN_PROCESO", "HECHO", "CANCELADO"]

export const PedidoSchema = new Schema({
	productos: [{
		estado: {
			type: String,
			default: ESTADOS_PEDIDO[0],
			enum: ESTADOS_PEDIDO,
		},
		nombre: String,
		precio: Number,
		cantidad: {
			type: Number,
			default: 1,
		},
		tipo: {
			type: String,
			required: true,
		},
		imagen: String,
		hechos: {
			type: Number,
			default: 0,
		},
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
		default: ESTADOS_TICKET[0],
		enum: ESTADOS_TICKET,
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

TicketSchema.index({ restauranteId: 1, estado: 1})


export default models.Ticket || model("Ticket", TicketSchema)