import { createTicket } from "../lib/actions"
import { useTicketContext, useLoginContext } from "../lib/context"
import "./StartPage.css"

export default function StartPage() {
    const { setTicket } = useTicketContext()
    const { login } = useLoginContext()
    const handleStart = () => {
        console.log(login)
        createTicket(login?.data)
        .then(
            data => {
                setTicket(data._id)
            }
        )
    }
    return (
        <div className="start-page-container">
                <h1 className="title">{login?.data?.restaurante?.nombre || "Restaurante"}</h1>
            <div className="start-page-box"  onClick={handleStart}>
                <h2>COMENZAR</h2>
            </div>
        </div>
    )
}