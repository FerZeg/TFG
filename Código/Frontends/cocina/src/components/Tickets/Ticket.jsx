import PropTypes from 'prop-types';
import currency from 'currency.js';

export default function Ticket({ ticket }) {
    const fechaCreada = new Date(ticket.createdDate);
    const fechaTicket  = { fecha: fechaCreada.toLocaleDateString(), hora: fechaCreada.toLocaleTimeString() };
    const moneda = currency(ticket.total).toString();
    return (
        <tr>
            <td>{ticket.mesa}</td>
            <td>{fechaTicket.fecha + ' ' + fechaTicket.hora}</td>
            <td>{ticket.estado}</td>
            <td>{moneda} €</td>
            <td>Eliminar</td>
        </tr>
    )
}

Ticket.propTypes = {
    ticket: PropTypes.object.isRequired
}