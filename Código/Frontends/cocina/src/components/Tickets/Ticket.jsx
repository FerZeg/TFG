import PropTypes from 'prop-types';

export default function Ticket({ ticket }) {
    return (
        <tr>
            <td>{ticket.mesa}</td>
            <td>{ticket.createdDate}</td>
            <td>{ticket.estado}</td>
            <td>{ticket.total}</td>
        </tr>
    )
}

Ticket.propTypes = {
    ticket: PropTypes.object.isRequired
}