import { createTicket } from "../lib/actions"
import { useTicketContext, useLoginContext } from "../lib/context"

export default function StartPage() {
    const { setTicket } = useTicketContext()
    const { login } = useLoginContext()
    const handleStart = () => {
        console.log(login)
        createTicket(login?.data).then(
            data => data.json()
        ).then(
            data => {
                console.log(data)
                setTicket(data._id)
            }
        )
    }
    return (
        <div className="start-page-container">
            <div className="start-page-box">
                <h1>{login?.data?.restaurante?.nombre || "Restaurante"}</h1>
                <h2 onClick={handleStart}>COMENZAR</h2>
            </div>
        </div>
    )
}