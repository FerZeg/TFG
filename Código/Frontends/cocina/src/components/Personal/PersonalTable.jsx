import PropTypes from 'prop-types'
import PersonalField from './PersonalField';
import { useRestauranteContext } from '../../lib/context';
import { useShallow } from 'zustand/react/shallow';
import { toast } from 'sonner';

function PersonalTable({ fields }) {
    const { users, addUser } = useRestauranteContext(
        useShallow(state => ({
            users: state.users,
            addUser: state.addUser
    })))
    const handleAddButton = () => {
        const newPersonal = ({
            nombre: '',
            email: '',
            role: 'cocinero',
            alreadyExist: false
        })
        if (users.some(u => u.alreadyExist === false)) {
            return toast.warning("Hay mesas sin guardar cambios");
        }
        addUser(newPersonal)
    }
    console.log(users)
    return (
        <>
            <table className='table'>
                <thead>
                    <tr>
                        {Object.values(fields).map((field, index) => (
                            <th key={index}>{field.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <PersonalField 
                        user={user} 
                        key={user._id} 
                         />
                    ))}
                </tbody>
            </table>
            <button 
                onClick={handleAddButton} 
                className='button-add'>
                Añadir
            </button>
        </>
    );
}

export default PersonalTable;
PersonalTable.propTypes = {
    fields: PropTypes.object.isRequired,
}
