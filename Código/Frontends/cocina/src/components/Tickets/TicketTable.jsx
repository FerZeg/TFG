import { useTicketsContext } from "../../lib/context"
import { useShallow } from "zustand/react/shallow"
import Ticket from "./Ticket"
import { AnimatePresence } from "framer-motion"

export default function TicketTable() {
    const { tickets } = useTicketsContext(
        useShallow(state => ({
            tickets: state.tickets
    })))
    return (
        <div className="box-section">
            <table 
            id="ticketTable" 
            className="table"          
            >
                <thead>
                    <tr>
                        <th>Mesa</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <AnimatePresence>
                    {
                        tickets && tickets.map(ticket => (
                            <Ticket ticket={ticket} key={ticket._id} />
                        ))
                    }
                    </AnimatePresence>
                </tbody>
            </table>
        </div>
    )
}