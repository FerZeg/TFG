import { useNavigationContext } from "../../lib/context"
import "./Products.css"
import { useRestauranteContext } from "../../lib/context"

export default function Products() {
    const { active } = useNavigationContext()
    const { productos } = useRestauranteContext()
    const productosFiltered = productos && productos.filter(p => p.tipo == active) || []
    return (
        <div className="products-container">
            <h1>{active}</h1>
            <div className="item-box">
                {productos && productosFiltered.map(p => (
                    <div key={p._id} className="item">
                        <h2>{p.nombre}</h2>
                        <p>{p.precio}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}