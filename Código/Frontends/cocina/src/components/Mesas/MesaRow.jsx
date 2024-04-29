import PropTypes from 'prop-types';
import { useState } from 'react';
import { useLoginContext, useRestauranteContext } from '../../lib/context';
import { updateMesaRemote, deleteMesaRemote } from '../../lib/actions';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';

export default function MesaRow({mesa}) {
    const { login } = useLoginContext(); 
    const { updateMesa, removeMesa } = useRestauranteContext(useShallow(state => ({
        updateMesa: state.updateMesa,
        removeMesa: state.removeMesa
    })));
    const [changed, setChanged] = useState(false);
    const handleInputChange = (e) => {
        console.log(mesa)
        if(e.target.value !== mesa.identificador || e.target.value !== mesa.capacidad) {
            setChanged(true);
            console.log(22)
            updateMesa(mesa, {...mesa, [e.target.name]: e.target.value});
        } else {
            setChanged(false);
        }
    }
    const handleSave = async () => {
        const result = await updateMesaRemote(mesa, login.data.restauranteId);
        if(result.ok) {
            toast.success("Datos guardados correctamente")
            setChanged(false);
            updateMesa(mesa, {...mesa, alreadyExist: true, _id: result._id});
        }
        else toast.error("Error al guardar los datos")
    }
    const handleDelete = async () => {
        const result = await deleteMesaRemote(mesa, login.data.restauranteId);
        if(result) {
            removeMesa(mesa);
            toast.success("Mesa eliminada correctamente")
        }
        else toast.error("Error al eliminar la mesa")
    }


    return (
        <tr>
            <td>
                <input
                    type="text"
                    name="identificador"
                    value={mesa.identificador}
                    onChange={handleInputChange}
                />
            </td>
            <td>
                <input
                    type="number"
                    name="capacidad"
                    value={mesa.capacidad}
                    onChange={handleInputChange}
                />
            </td>
            <td>
                <select name="estado" id="" value={mesa.estado} onChange={handleInputChange}>
                    <option value="LIBRE">LIBRE</option>
                    <option value="OCUPADA">OCUPADA</option>
                </select>
            </td>
            <td>
                <button disabled={!changed} onClick={handleSave}>Guardar</button>
                <button onClick={handleDelete}>Eliminar</button>
            </td>
        </tr>
    )
}

MesaRow.propTypes = {
    mesa: PropTypes.object.isRequired
}
