import PropTypes from 'prop-types'
import PersonalField from './PersonalField';

function PersonalTable({ personal, fields, setPersonal }) {
    const handleAddButton = () => {
        const newPersonal = [...personal]
        newPersonal.push({
            user: {
                nombre: '',
                email: ''
            },
            role: 'cocinero',
            alreadyExist: false
        })
        setPersonal(newPersonal)
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
                    {personal.map((person) => (
                        <PersonalField 
                        person={person} 
                        key={person.user._id} 
                        personal={personal}
                        alreadyExist={person.alreadyExist}
                        setPersonal={setPersonal}
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
    personal: PropTypes.array,
    fields: PropTypes.object.isRequired,
    setPersonal: PropTypes.func.isRequired
}
