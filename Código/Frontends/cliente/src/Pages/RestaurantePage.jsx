import Navigation from "../components/Navigation/Navigation"
import Main from "../components/Main/Main"
import Finish from "../components/Finish"
import { useEffect } from "react"
import { useRestauranteContext, useLoginContext, useTicketContext } from "../lib/context"
import { fetchProductos, fetchTicket } from "../lib/fetchers"

export default function RestaurantePage() {
    const { setProductos } = useRestauranteContext()
    const { login } = useLoginContext()
    const { setTicket } = useTicketContext()
    useEffect(() => {
        fetchProductos(login.data).then(
            data => {
                setProductos(data)
            }
        )
    }, [setProductos, login, setTicket])
    useEffect(() => {
        fetchTicket().then((val) => {
            if(!val) {
                setTicket(null)
            }
        })
    }, [setTicket])
    return (
        <div className="main-container">
            <Navigation />
            <div className="sub-container">
                <Main />
                <Finish />
            </div>
        </div>
    )
}