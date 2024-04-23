import PropTypes from 'prop-types'
import PersonalField from './PersonalField';
import { useRestauranteContext } from '../../lib/context';

function PersonalTable({ fields }) {
    const { users, addUser } = useRestauranteContext()
    const handleAddButton = () => {
        const newPersonal = ({
            user: {
                nombre: '',
                email: ''
            },
            role: 'cocinero',
            alreadyExist: false
        })
        addUser(newPersonal)
    }
    return (
        <>
            <table>
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
                        key={user.user._id} 
                         />
                    ))}
                </tbody>
            </table>
            <button onClick={handleAddButton}>Añadir</button>
        </>
    );
}

export default PersonalTable;
PersonalTable.propTypes = {
    fields: PropTypes.object.isRequired,
}
