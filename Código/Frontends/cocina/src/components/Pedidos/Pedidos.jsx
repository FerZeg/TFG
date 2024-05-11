import { usePendientesContext } from "../../lib/context"
import "./Pedidos.css"
import { useState } from "react"
import PedidosActions from "./PedidosActions"

export function Pedidos() {
    const { pendientes } = usePendientesContext()
    const [dialog, setDialog] = useState({
        producto: null,
        isOpen: false
    })
    const handleClick = (pedido) => {
        setDialog({
            producto: pedido,
            isOpen: true
        })
    }
    return (
        <div className="box-section">
            <div className="pedidos-grid">
                {pendientes && pendientes.map((pedido, index) => (
                    <div key={index} onClick={() => {handleClick(pedido)}} className="pedido">
                        <h3>{pedido.nombre}</h3>
                        <span className="cantidad">{pedido.cantidad}</span>
                        <img 
                            src={pedido.imagen || "Placeholder.svg"} 
                            alt={pedido.nombre} 
                            width="100"
                        />
                    </div>
                ))}
            </div>	
            <PedidosActions dialog={dialog} setDialog={setDialog}/>
        </div>
    )
}