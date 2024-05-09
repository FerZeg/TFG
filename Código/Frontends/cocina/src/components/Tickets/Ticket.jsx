import PropTypes from "prop-types"
import currency from "currency.js"
import { deleteTicketRemote } from "../../lib/actions"
import { useLoginContext } from "../../lib/context"
import { useTicketsContext } from "../../lib/context"
import { useShallow } from "zustand/react/shallow"
import { toast } from "sonner"
import { motion } from "framer-motion"

export default function Ticket({ ticket }) {
    const { login } = useLoginContext()
    const { removeTicket } = useTicketsContext(useShallow(state => ({
        removeTicket: state.removeTicket
    })))
    const fechaCreada = new Date(ticket.createdDate)
    const fechaTicket  = { fecha: fechaCreada.toLocaleDateString(), hora: fechaCreada.toLocaleTimeString() }
    const moneda = currency(ticket.total).toString()
    const style = ticket.estado === "ABIERTO" ? { color: "green" } : { color: "red" }
    const handleDelete = async () => {
        const result = await deleteTicketRemote(ticket, login.data.restauranteId)
        if(result) {
            removeTicket(ticket)
            toast.success("Ticket eliminado correctamente")
        }
    }
    return (
        
        <motion.tr
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <td>{ticket.mesa}</td>
            <td>{fechaTicket.fecha + " " + fechaTicket.hora}</td>
            <td style={style}>{ticket.estado}</td>
            <td>{moneda} €</td>
            <td>
                <button onClick={handleDelete}>
                    Eliminar
                </button>
            </td>
        </motion.tr>
    )
}

Ticket.propTypes = {
    ticket: PropTypes.object.isRequired
}