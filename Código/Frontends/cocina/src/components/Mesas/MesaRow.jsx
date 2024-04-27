import PropTypes from 'prop-types';
import { useState } from 'react';
import { useLoginContext, useRestauranteContext } from '../../lib/context';
import { updateMesaRemote, deleteMesaRemote } from '../../lib/actions';
import { toast } from 'sonner';

export default function MesaRow({mesa}) {
    const { login } = useLoginContext(); 
    const { updateMesa, removeMesa } = useRestauranteContext();
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
        <div className='mesa-row'>
            <div className='mesa-row-info'>
                <input type="text" name='identificador' value={mesa.identificador} onChange={(e) => handleInputChange(e)}/>
                <input type="number" name='capacidad' value={mesa.capacidad} onChange={(e) => handleInputChange(e)} />
            </div>
            <div className='mesa-row-buttons'>
                <button disabled={!changed} onClick={handleSave}>Guardar</button>
                <button onClick={handleDelete}>Eliminar</button>
            </div>
        </div>
    )
}

MesaRow.propTypes = {
    mesa: PropTypes.object.isRequired
}
