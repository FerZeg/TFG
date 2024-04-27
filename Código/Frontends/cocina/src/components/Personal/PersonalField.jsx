import PropTypes from 'prop-types'
import { useState } from 'react'
import { toast } from 'sonner';
import { deleteUserRemote, updateUserRemote } from '../../lib/actions';
import { useLoginContext } from '../../lib/context';
import { createUserRemote } from '../../lib/actions';
import { useRestauranteContext } from '../../lib/context';
import { useShallow } from 'zustand/react/shallow';

export default function PersonalField({user}) {
    const { login } = useLoginContext()
    const { removeUser, updateUser} = useRestauranteContext(useShallow(state => ({
        removeUser: state.removeUser,
        updateUser: state.updateUser,
        users: state.users
    })) )
    const [changed, setChanged] = useState(false)
    
    const handleSaveButton = async () => {
        if(!changed) {
            toast.error('No se han realizado cambios')
            return
        }
        if(user.alreadyExist) {
            const response = await updateUserRemote(user, login.data.restauranteId)
            if(response.ok) {
                setChanged(false)
                toast.success('Usuario actualizado')
                updateUser(user, {...user, alreadyExist: true, _id: response._id})
            } else {
                toast.error('Error al actualizar el usuario')
            }
            return
        }
        const response = await createUserRemote(user, login.data.restauranteId)
        if(response.ok) {
            const data = await response.json()
            const {_id} = data
            setChanged(false)
            toast.success('Usuario creado')
            updateUser(user, {...user, alreadyExist: true, _id})

        }
        else {
            toast.error('Error al crear el usuario')
        }
    }
    const handleDeleteButton = async () => {
        const response = await deleteUserRemote(user, login.data.restauranteId)
        if(response) {
            removeUser(user)
            toast.success('Usuario eliminado')
        } else {
            toast.error('Error al eliminar el usuario')
        }
    }
    const handleInputChange = (e) => {
        setChanged(true);
        updateUser(user, {...user, [e.target.name]: e.target.value})
    };

    return (
        <tr>
            <td><input type="text" name="nombre" value={user.nombre} onChange={handleInputChange} /></td>
            <td>
                <select name='role' value={user.role} onChange={handleInputChange}>
                    <option value="admin">Admin</option>
                    <option value="cocinero">Cocinero</option>
                </select>
            </td>
            <td><input type="password" name="password" value={user.password} onChange={handleInputChange} /></td>
            <td><input type="email" name="email" value={user.email} onChange={handleInputChange} /></td>
            <td>
                <a 
                    className={'save' + (changed ? ' changed' : '')}
                    onClick={handleSaveButton}>
                    {user.alreadyExist ? 'Guardar' : 'Crear'}
                </a>
                {user.alreadyExist && (
                    <a onClick={handleDeleteButton} className='delete'>
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
