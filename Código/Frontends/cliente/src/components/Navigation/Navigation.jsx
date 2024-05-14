import Dessert from "../../icons/dessert"
import Drink from "../../icons/drink"
import Hamburguer from "../../icons/hamburguer"
import { useNavigationContext } from "../../lib/context"
import "./Navigation.css"

export default function Navigation() {
    const { active, setActive } = useNavigationContext()

    const handleFoodClick = () => {
        setActive("plato")
    }
    const handleDrinksClick = () => {
        setActive("bebida")
    }
    const handleDessertsClick = () => {
        setActive("postre")
    }

    return (
        <nav>
            <div className={active === "plato" ? "active" : ""} onClick={handleFoodClick}>
                <Hamburguer />
            </div>
            <div className={active === "bebida" ? "active" : ""} onClick={handleDrinksClick}>
                <Drink />
            </div>
            <div className={active === "postre" ? "active" : ""} onClick={handleDessertsClick}>
                <Dessert />
            </div>
        </nav>
    )
}