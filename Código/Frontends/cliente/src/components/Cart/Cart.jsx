import "./Cart.css"
import { useCartContext } from "../../lib/context"

export default function Cart() {
    const { cart } = useCartContext()
    return (
        <div className="cart-container">
            <p className="cart-title">Pedido</p>
            <div className='cart-items'>
                {cart.map(p => (
                    <div key={p._id} className='cart-item'>
                        <div className='cart-item-info'>
                            <h3>{p.nombre}</h3>
                            <p>{p.descripcion}</p>
                            <p>${p.precio}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button>Hacer pedido</button>
        </div>
    )
}