import PropTypes from 'prop-types'
import { useState } from 'react'
import { toast } from 'sonner';
import { deleteUserRemote, updateUserRemote } from '../../lib/actions';
import { useLoginContext } from '../../lib/context';
import { createUserRemote } from '../../lib/actions';
import { useRestauranteContext } from '../../lib/context';
import { useEffect } from 'react';

export default function PersonalField({user}) {
    const { login } = useLoginContext()
    const { removeUser, updateUser } = useRestauranteContext()
    const [nombre, setNombre] = useState(user.user.nombre)
    const [role, setRole] = useState(user.role)
    const [email, setEmail] = useState(user.user.email)
    const [exists, setExist] = useState(user.alreadyExist)
    const [changed, setChanged] = useState(false)
    const [password, setPassword] = useState('********')

    useEffect(() => {
        console.log('user', user)
    }, [user])
    
    const handleSaveButton = async () => {
        if(!changed) {
            toast.error('No se han realizado cambios')
            return
        }
        if(exists) {
            const response = await updateUserRemote(
                {nombre, role, email, contraseña: password === '********' ? undefined : password},
                 login.data.restauranteId, user.user._id)
            if(response) {
                setChanged(false)
                toast.success('Usuario actualizado')
                updateUser({user: {nombre, email, password, _id: user.user._id}, role, alreadyExist: true})
            } else {
                toast.error('Error al actualizar el usuario')
            }
            return
        }
        const response = await createUserRemote({nombre, role, email, contraseña: password}, login.data.restauranteId)
        if(response.ok) {
            const data = await response.json()
            const {_id} = data
            setExist(true)
            setChanged(false)
            toast.success('Usuario creado')
            updateUser({user: {nombre, email, password, _id}, role, alreadyExist: true})

        }
        else {
            toast.error('Error al crear el usuario')
        }
    }
    const handleDeleteButton = async (id) => {
        const response = await deleteUserRemote(id, login.data.restauranteId)
        if(response) {
            removeUser(user)
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
            <td>
                <select name='role' onChange={handleInputChange}>
                    <option value="admin">Admin</option>
                    <option value="cocinero">Cocinero</option>
                </select>
            </td>
            <td><input type="password" name="password" value={password} onChange={handleInputChange} /></td>
            <td><input type="email" name="email" value={email} onChange={handleInputChange} /></td>
            <td>
                <a 
                    className={'save' + (changed ? ' changed' : '')}
                    onClick={handleSaveButton}>
                    {exists ? 'Guardar' : 'Crear'}
                </a>
                {exists && (
                    <a onClick={() => handleDeleteButton(user.user._id)} className='delete'>
                        Eliminar
                    </a>
                )}
            </td>
        </tr>
    );
}

PersonalField.propTypes = {
    user: PropTypes.object.isRequired,

}
