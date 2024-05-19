import { useState } from "react"
import NumberInput from "../NumberInput/NumberInput"
import PropTypes from "prop-types"
import currency from "currency.js"
import { useCartContext } from "../../lib/context"

export default function ProductCard(props) {
    const { addProduct } = useCartContext()
    const p = props.product
    const [quantity, setQuantity] = useState(1)
    const handleClick = () => {
        addProduct({ ...p, quantity })
    }
    const precio = currency(p.precio).toString()
    return (
        <div className="item">
            <img 
                src={p.imagen || "Placeholder.svg"} 
                alt={"Imágen de " + p.nombre} 
            />
            <div className="flex">
                <span>{p.nombre}</span>
                <p>{precio}€</p>
            </div>
            <div className="flex">
                <NumberInput max={99} number={quantity} setNumber={setQuantity}/>
                <button onClick={handleClick}>Añadir</button>
            </div>
        </div>
    )
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
}