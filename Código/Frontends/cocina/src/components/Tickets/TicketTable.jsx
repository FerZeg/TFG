import { useTicketsContext } from "../../lib/context"
import { useShallow } from "zustand/react/shallow"
import Ticket from "./Ticket"

export default function TicketTable() {
    const { tickets } = useTicketsContext(
        useShallow(state => ({
            tickets: state.tickets
    })))
    return (
        <table id="ticketTable" className="table">
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
                {
                    tickets && tickets.map(ticket => (
                        <Ticket ticket={ticket} key={ticket._id} />
                    ))
                }
            </tbody>
        </table>
    )
}