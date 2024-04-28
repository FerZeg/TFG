import PropTypes from 'prop-types';

export default function Ticket({ ticket }) {
    const fechaCreada = new Date(ticket.createdDate);
    const fechaTicket  = { fecha: fechaCreada.toLocaleDateString(), hora: fechaCreada.toLocaleTimeString() };
    return (
        <tr>
            <td>{ticket.mesa}</td>
            <td>{fechaTicket.fecha + ' ' + fechaTicket.hora}</td>
            <td>{ticket.estado}</td>
            <td>{ticket.total} €</td>
            <td>Eliminar</td>
        </tr>
    )
}

Ticket.propTypes = {
    ticket: PropTypes.object.isRequired
}