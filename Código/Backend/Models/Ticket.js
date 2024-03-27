import { Schema, model } from "mongoose"

const TicketSchema = new Schema({
	total: Number,
	pedidos: [{
		nombre: String,
		precio: Number,
		cantidad: {
			type: Number,
			default: 1,
		},
		estado: {
			type: String,
			default: "PENDIENTE",
			enum: ["PENDIENTE", "EN_PROCESO", "SERVIDO"],
		},
	}],
	estado: {
		type: String,
		default: "NOPAID",
		enum: ["NOPAID", "PAID", "CANCELLED"],
	},
	restaurante: Schema.Types.ObjectId,
	mesa: {
		type: String,
		required: true,
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

TicketSchema.method("updateTotal", function() {
	this.total = this.pedidos.reduce((acc, pedido) => acc + pedido.precio * pedido.cantidad, 0)
})
  
TicketSchema.pre("save", function(next) {
	this.updateTotal()
	next()
})
  
TicketSchema.pre("updateOne", function(next) {
	this.lastModifiedDate = Date.now()
	this.updateTotal()
	next()
})

export default model("Ticket", TicketSchema)