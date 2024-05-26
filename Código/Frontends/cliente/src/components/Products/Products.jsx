import { useNavigationContext } from "../../lib/context"
import "./Products.css"
import { useRestauranteContext } from "../../lib/context"
import ProductCard from "./ProductCard"

const toUpperCase = (str) => str[0].toUpperCase() + str.slice(1)

export default function Products() {
    const { active } = useNavigationContext()
    const { productos } = useRestauranteContext()
    const productosFiltered = productos && productos.filter(p => p.tipo == active) || []
    return (
        <div className="products-container">
            <h1>{toUpperCase(active)}</h1>
            <div className="item-box">
                {productos && productosFiltered.map(p => (
                    <ProductCard key={p._id} product={p}/>
                ))}
            </div>
        </div>
    )
}