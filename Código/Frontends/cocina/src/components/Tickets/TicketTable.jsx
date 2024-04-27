import { useTicketsContext } from "../../lib/context"
import { useShallow } from "zustand/react/shallow"
import Ticket from "./Ticket"

export default function TicketTable() {
    const { tickets } = useTicketsContext(
        useShallow(state => ({
            tickets: state.tickets
    })))
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Numero</th>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Estado</th>
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
        </div>
    )
}