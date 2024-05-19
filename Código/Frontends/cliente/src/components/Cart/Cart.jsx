import "./Cart.css"
import { useCartContext } from "../../lib/context"
import currency from "currency.js"


export default function Cart() {
    const { cart } = useCartContext()
    return (
        <div className="cart-container">
            <p className="cart-title">Pedido</p>
            <div className='cart-items'>
                {cart.map(p => (
                    <div key={p._id} className='cart-item'>
                        <div className='cart-item-info'>
                            <h3>{p.nombre} x {p.quantity}</h3>
                            <span className="separator"></span>
                            <p>{currency(p.precio  * p.quantity)?.toString()}€</p>
                        </div>
                    </div>
                ))}
            </div>
            <button>Hacer pedido</button>
        </div>
    )
}