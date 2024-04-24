import { useRestauranteContext } from "../../lib/context"
import MesaRow from "./MesaRow"
import './Mesas.css'

export default function Mesas() {
    const { mesas, addMesa } = useRestauranteContext()
    return (
        <div id='mesas-section'>
            <h1>Mesas</h1>
            <div id='mesas-container'>
                {mesas.map((mesa) => (
                    <MesaRow key={mesa._id} mesa={mesa} />
                ))}
                <button
                    onClick={() => addMesa({identificador: '', capacidad: 0})}
                    >Añadir</button>
            </div>
        </div>
    )
}