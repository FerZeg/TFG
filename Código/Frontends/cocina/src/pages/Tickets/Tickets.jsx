import "./Tickets.css"
import { useTicketsContext, useLoginContext } from "../../lib/context"
import TicketTable from "../../components/Tickets/TicketTable"
import { useEffect } from "react"
import { fetchTickets } from "../../lib/fetchers"

export default function TicketsPage() {
    const { setTickets } = useTicketsContext()
    const { login } = useLoginContext()
    useEffect(() => {
        if(!login.value) return
        fetchTickets(login.data.restauranteId)
            .then(data => setTickets(data))
    }, [login, setTickets])
    useEffect(() => {
        document.title = "Tickets - Restaurante"
    }
    , [])
    return (
        <section id='tickets' className='page'>
            <TicketTable />
        </section>
    )
}
