import Navigation from "../components/Navigation/Navigation"
import Main from "../components/Main/Main"
import Finish from "../components/Finish"
import { useEffect } from "react"
import { useRestauranteContext, useLoginContext } from "../lib/context"
import { fetchProductos } from "../lib/fetchers"

export default function RestaurantePage() {
    const { setProductos } = useRestauranteContext()
    const { login } = useLoginContext()
    useEffect(() => {
        fetchProductos(login.data).then(
            data => {
                setProductos(data)
            }
        )
    }, [setProductos, login])
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