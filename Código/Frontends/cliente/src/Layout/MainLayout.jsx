import { useTicketContext } from "../lib/context"
import RestaurantePage from "../Pages/RestaurantePage"
import StartPage from "../Pages/StartPage"

export default function MainLayout() {
    const { ticket } = useTicketContext()
    return !ticket ? <StartPage /> : <RestaurantePage />
}