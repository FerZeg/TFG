import PropTypes from "prop-types"
import "./NumberInput.css"

export default function NumberInput(props) {
    const { number, setNumber } = props
    const handleClick = (e) => {
        let newNumber = number
        if(e.target.value === "+") {
            if(props.max < number + 1) return
            newNumber = number + 1
        } else {
            if(number - 1 === 0) return
            newNumber = number - 1
        }
        setNumber(newNumber)
    }

    return (
        <div className="input-group-number">
            <input type="button" value="-" className="button-minus" data-field="quantity" onClick={handleClick}/>
            <input type="number" value={number} name="quantity" className="quantity-field" readOnly/>
            <input type="button" value="+" className="button-plus" data-field="quantity" onClick={handleClick}/>
        </div>
    )
}

NumberInput.propTypes = {
    max: PropTypes.number,
    number: PropTypes.number,
    setNumber: PropTypes.func.isRequired,
}