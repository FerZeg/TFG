import { useTicketContext } from "../lib/context"

export default function Finish() {
    const { setTicket } = useTicketContext()
    return (
        <div className="finish-container">
            <button onClick={() => setTicket(null)}>Terminar</button>
        </div>
    )
}