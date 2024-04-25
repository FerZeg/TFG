import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRestauranteContext } from '../../lib/context';
import { updateMesaRemote } from '../../lib/restaurante';
import { toast } from 'sonner';

export default function MesaRow({mesa}) {
    const { updateMesa, login } = useRestauranteContext();
    const [changed, setChanged] = useState(false);
    const handleInputChange = (e) => {
        if(e.target.value !== mesa.identificador || e.target.value !== mesa.capacidad) {
            setChanged(true);
            updateMesa({...mesa, [e.target.name]: e.target.value});
        } else {
            setChanged(false);
        }
    }
    const handleSave = () => {
        const result = updateMesaRemote(mesa, login.data.restauranteId);
        if(result) toast.success("Datos guardados correctamente")
        else toast.error("Error al guardar los datos")
    }


    return (
        <div className='mesa-row'>
            <div className='mesa-row-info'>
                <input type="text" name='identificador' value={mesa.identificador} onChange={(e) => handleInputChange(e)}/>
                <input type="number" name='capacidad' value={mesa.capacidad} onChange={(e) => handleInputChange(e)} />
            </div>
            <div className='mesa-row-buttons'>
                <button disabled={!changed} onClick={handleSave}>Guardar</button>
                <button>Eliminar</button>
            </div>
        </div>
    )
}

MesaRow.propTypes = {
    mesa: PropTypes.object.isRequired
}
