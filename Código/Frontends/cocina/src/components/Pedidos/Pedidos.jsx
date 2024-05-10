import { usePendientesContext } from "../../lib/context"
import "./Pedidos.css"

export function Pedidos() {
    const { pendientes } = usePendientesContext()
    console.log(pendientes)
    return (
        <div className="box-section">
            <h1>Pedidos</h1>
            <div className="pedidos-grid">
                {pendientes && pendientes.map((pedido, index) => (
                    <div key={index}>
                        <h3>{pedido.nombre}</h3>
                        <span>{pedido.cantidad}</span>
                        <img 
                            src={pedido.imagen || "Placeholder.svg"} 
                            alt={pedido.nombre} 
                            width="100"
                        />
                    </div>
                ))}
            </div>	
        </div>
    )
}