import { useShallow } from "zustand/react/shallow"
import { useRestauranteContext } from "../../lib/context"
import MesaRow from "./MesaRow"
import { toast } from 'sonner'

export default function Mesas() {
    const { mesas, addMesa } = useRestauranteContext(useShallow(state => ({
        mesas: state.mesas,
        addMesa: state.addMesa
    })) )
    const handleAddMesa = () => {
        if (mesas.some(m => m.alreadyExist === false)) {
            return toast.warning("Hay mesas sin guardar cambios");
        }
        addMesa({identificador: '', capacidad: 0});
    }
    return (
        <>
            <h3 className="section-title">Mesas</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Identificador</th>
                        <th>Capacidad</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {mesas.map((mesa) => (
                        <MesaRow key={mesa._id} mesa={mesa} />
                    ))}
                </tbody>
            </table>
            <button
                onClick={() => handleAddMesa()}
                className="button-add">
                Añadir
            </button>
        </>
    )
}