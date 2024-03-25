import { Schema, model } from 'mongoose'

const TicketSchema = new Schema({
    total: Number,
    pedidos: [{
        nombre: String,
        precio: Number,
        cantidad: Number,
        estado: {
            type: String,
            default: 'PENDIENTE',
            enum: ['PENDIENTE', 'EN_PROCESO', 'SERVIDO'],
        },
    }],
    estado: {
        type: String,
        default: 'NOPAID',
        enum: ['NOPAID', 'PAID', 'CANCELLED'],
    },
    restaurante: Schema.Types.ObjectId,
    mesa: {
        identificador: {
            type: String,
            required: true,
        },
    },
    fecha: {
        type: Date,
        default: Date.now,
    },
});

function updateTotal(next) {
    this.total = this.pedidos.reduce((acc, pedido) => acc + pedido.precio * pedido.cantidad, 0);
    next();
}
TicketSchema.pre('save', updateTotal);
TicketSchema.pre('update', updateTotal);

export default model('Ticket', TicketSchema)