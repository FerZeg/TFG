import { useState } from "react"
import PropTypes from "prop-types"
import "./NumberInput.css"

export default function NumberInput(props) {
    const [quantity, setQuantity] = useState(1)
    const handleClick = (e) => {
        let newQuantity = quantity
        if(e.target.value === "+") {
            if(props.max < quantity + 1) return
            newQuantity = quantity + 1
        } else {
            if(quantity - 1 === 0) return
            newQuantity = quantity - 1
        }
        setQuantity(newQuantity)
    }

    return (
        <div className="input-group-number">
            <input type="button" value="-" className="button-minus" data-field="quantity" onClick={handleClick}/>
            <input type="number" value={quantity} name="quantity" className="quantity-field" readOnly/>
            <input type="button" value="+" className="button-plus" data-field="quantity" onClick={handleClick}/>
        </div>
    )
}

NumberInput.propTypes = {
    max: PropTypes.number,
}