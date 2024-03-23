import { model } from 'mongoose';
import { RestauranteSchema, TicketSchema } from './Schemas.js';

const Restaurante = model('Restaurante', RestauranteSchema);
const Ticket = model('Ticket', TicketSchema);
export { Restaurante, Ticket }