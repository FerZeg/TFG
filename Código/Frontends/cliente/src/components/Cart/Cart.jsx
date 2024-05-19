import "./Cart.css"
import { useCartContext, useLoginContext, useTicketContext } from "../../lib/context"
import currency from "currency.js"
import { createPedido } from "../../lib/actions"


export default function Cart() {
    const { cart, removeProduct, setCart } = useCartContext()
    const { login } = useLoginContext()
    const { ticket } = useTicketContext()
    const total = currency(
        cart.reduce((acc, p) => acc + p.precio * p.quantity, 0)
    ).toString()
    const handleClick = () => {
        createPedido(cart, login.data, ticket).then(() => {
            setCart([])
        })
    }
    const handleDelete = (id) => {
        removeProduct(id)
    }
    return (
        <div className="cart-container">
            <p className="cart-title">Pedido</p>
            <div className='cart-items'>
                {cart.map(p => (
                    <div key={p._id} className='cart-item'>
                        <div className='cart-item-info'>
                            <div>
                                <h3>{p.nombre} x {p.quantity}</h3>
                                <p>{currency(p.precio  * p.quantity)?.toString()}€</p>
                            </div>
                            <div>
                                <button 
                                    className="delete-item"
                                    onClick={() => handleDelete(p._id)}
                                    >
                                        Eliminar
                                </button>
                            </div>
                            <span className="separator"></span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex text-bold">
                <div>Total: {total}€</div>
                <button className="submit-cart" onClick={handleClick}>Hacer pedido</button>
            </div>
        </div>
    )
}