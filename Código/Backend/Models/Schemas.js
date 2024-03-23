import { Schema } from 'mongoose';

const RestauranteSchema = new Schema({
    nombre: String,
    direccion: String,
    telefono: String,
    platos: [PlatoSchema],
    mesas: [MesaSchema],
    contraseña: String,
    contraseña_mesas: String,
    cocineros: [CocineroSchema]
});
const PlatoSchema = new Schema({
    nombre: String,
    precio: Number,
    ingredientes: [String],
});
const CocineroSchema = new Schema({
    nombre: String,
    contraseña: String,
});
const MesaSchema = new Schema({
    identificador: String,
    estado: String,
    tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }],
});

const TicketSchema = new Schema({
    total: Number,
    pedidos: [PedidoSchema],
    estado: String,
});
const PedidoSchema = new Schema({
    plato: String,
    cantidad: Number,
    precio: Number,
});

export { RestauranteSchema, PlatoSchema, CocineroSchema, MesaSchema, TicketSchema, PedidoSchema }
