import { useRestauranteContext } from "../../lib/context"
import MesaRow from "./MesaRow"
import './Mesas.css'
import { toast } from 'sonner'

export default function Mesas() {
    const { mesas, addMesa } = useRestauranteContext()
    const handleAddMesa = () => {
        if (mesas.some(m => m.alreadyExist === false)) {
            return toast.warning("Hay mesas sin guardar cambios");
        }
        addMesa({identificador: '', capacidad: 0});
    }
    return (
        <div id='mesas-section'>
            <h1>Mesas</h1>
            <div id='mesas-container'>
                {mesas.map((mesa) => (
                    <MesaRow key={mesa._id} mesa={mesa} />
                ))}
                <button
                    onClick={() => handleAddMesa()}
                    >Añadir</button>
            </div>
        </div>
    )
}