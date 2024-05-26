import { finish } from "../lib/actions"
import { useTicketContext } from "../lib/context"
import { fetchTicket } from "../lib/fetchers"
import Dialog from "./UI/Dialog"
import { useState } from "react"
import currency from "currency.js"

export default function Finish() {
    const { setTicket } = useTicketContext()
    const [visible, setVisible] = useState(false)
    const [modal2, setModal2] = useState({visible: false, ticket: null, total: 0})
      
    const handleClick = () => {
        finish().then(() => {
            setTicket(null)
        })
    }
    const setVisible2 = (val) => {
        setModal2({
            visible: val,
            ticket: modal2.ticket
        })
    }
    const handleHistory = () => {
        fetchTicket().then((val) => {
            const total = val.pedidos.reduce((acc, pedido) => {
                return acc + pedido.productos.reduce((acc, producto) => {
                    return acc + producto.precio * producto.cantidad
                }
                , 0)
            }
            , 0)
            setModal2({
                visible: true,
                ticket: val,
                total: currency(total).toString()
            })
        })
    }
    return (
        <div className="finish-container">
            <button onClick={handleHistory}>Historial</button>
            <button onClick={() => setVisible(true)}>Terminar</button>
            {visible &&
            <>
                <Dialog setDialogIsOpen={setVisible}>
                    <h2>Gracias por su visita</h2>
                    <p>¿Desea terminar la sesión?</p>
                    <div className="flex">
                        <button onClick={handleClick}>Sí</button>
                        <button onClick={() => setVisible(false)}>No</button>
                    </div>
                </Dialog>
            </>
            }
            {modal2.visible &&
            <>
                <Dialog setDialogIsOpen={setVisible2}>
                    <h2>Historial</h2>
                    
                    <div className="pedidos-container">
                        {modal2.ticket.pedidos.map((pedido, index) => (
                            <div key={pedido._id}>
                            <p style={{fontWeight: "bold"}}>Pedido {index + 1}:</p>
                            {pedido.productos.map((producto) => (
                                <div key={producto._id}>
                                    <p>{producto.nombre} x {producto.cantidad} - {currency(producto.precio).toString()}€</p>
                                    <p>{currency(producto.precio * producto.cantidad).toString()}€</p>
                                </div>
                            ))}
                            </div>
                        ))}
                        <p style={{fontWeight: "bold", marginTop: "20px"}}>Total: {modal2.total} €</p>
                    </div>
                    <button onClick={() => setVisible2(false)}>Cerrar</button>
                </Dialog>
            </>
            }
        </div>
    )
}