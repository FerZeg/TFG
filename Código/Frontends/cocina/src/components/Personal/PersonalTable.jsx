import PropTypes from 'prop-types'
import { deleteUser } from '../../lib/actions';
import { useContext } from 'react';
import { loginContext } from '../../lib/context';
import { toast } from 'sonner';

function PersonalTable({ personal, fields, setPersonal }) {
    const { login } = useContext(loginContext)
    const handleDeleteButton = async (id) => {
        const result = await deleteUser(login.data.restauranteId, id)
        if(result) {
            const newPersonal = personal.filter((person) => person.user._id !== id)
            toast.success('Usuario eliminado')
            return setPersonal(newPersonal)
        }
        toast.error('No se pudo eliminar el usuario')
    }
    return (
        <table>
            <thead>
                <tr>
                    {Object.values(fields).map((field, index) => (
                        <th key={index}>{field.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {personal.map((person, index) => (
                    <tr key={index}>
                        <td>{person.user.nombre}</td>
                        <td>{person.role}</td>
                        <td>{'********'}</td>
                        <td>{person.user.email}</td>
                        <td>
                            <button>Añadir</button>
                            <button onClick={() => handleDeleteButton(person.user._id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default PersonalTable;
PersonalTable.propTypes = {
    personal: PropTypes.array,
    fields: PropTypes.object.isRequired,
    setPersonal: PropTypes.func.isRequired
}
