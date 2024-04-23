import PropTypes from 'prop-types'
import { useState } from 'react'
import { toast } from 'sonner';
import { deleteUser } from '../../lib/actions';
import { useLoginContext } from '../../lib/context';
import { createUser } from '../../lib/actions';
import { updateUser } from '../../lib/actions';

export default function PersonalField({alreadyExist = true, person, personal, setPersonal}) {
    const { login } = useLoginContext()
    const [nombre, setNombre] = useState(person.user.nombre)
    const [role, setRole] = useState(person.role)
    const [email, setEmail] = useState(person.user.email)
    const [exists, setExist] = useState(alreadyExist)
    const [changed, setChanged] = useState(false)
    const [password, setPassword] = useState('********')
    
    const handleSaveButton = async () => {
        if(!changed) {
            toast.error('No se han realizado cambios')
            return
        }
        if(exists) {
            const response = await updateUser(
                {nombre, role, email, contraseña: password === '********' ? undefined : password},
                 login.data.restauranteId, person.user._id)
            if(response) {
                setChanged(false)
                toast.success('Usuario actualizado')
            } else {
                toast.error('Error al actualizar el usuario')
            }
            return
        }
        const response = await createUser({nombre, role, email, contraseña: password}, login.data.restauranteId)
        if(response.ok) {
            const data = await response.json()
            const {_id} = data
            setExist(true)
            setChanged(false)
            toast.success('Usuario creado')
            setPersonal([...personal.slice(0, -1), {user: {nombre, email, password, _id}, role, alreadyExist: true}])
            console.log()
        }
        else {
            toast.error('Error al crear el usuario')
        }
    }
    const handleDeleteButton = async (id) => {
        const response = await deleteUser(id, login.data.restauranteId)
        if(response) {
            const newPersonal = personal.filter((person) => person.user._id !== id)
            setPersonal(newPersonal)
            toast.success('Usuario eliminado')
        } else {
            toast.error('Error al eliminar el usuario')
        }
    }
    const handleInputChange = (e) => {
        setChanged(true);
        switch (e.target.name) {
            case 'nombre':
                setNombre(e.target.value);
                break;
            case 'role':
                setRole(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            default:
                break;
        }
    };

    return (
        <tr>
            <td><input type="text" name="nombre" value={nombre} onChange={handleInputChange} /></td>
            <td><input type="text" name="role" value={role} onChange={handleInputChange} /></td>
            <td><input type="password" name="password" value={password} onChange={handleInputChange} /></td>
            <td><input type="email" name="email" value={email} onChange={handleInputChange} /></td>
            <td>
                <a 
                    className={'save' + (changed ? ' changed' : '')}
                    onClick={handleSaveButton}>
                    {exists ? 'Guardar' : 'Crear'}
                </a>
                {exists && (
                    <a onClick={() => handleDeleteButton(person.user._id)} className='delete'>
                        Eliminar
                    </a>
                )}
            </td>
        </tr>
    );
}

PersonalField.propTypes = {
    person: PropTypes.object.isRequired,
    setPersonal: PropTypes.func.isRequired,
    personal: PropTypes.array.isRequired,
    alreadyExist: PropTypes.bool

}
