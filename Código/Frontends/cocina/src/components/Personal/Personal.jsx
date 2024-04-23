import PersonalTable from "./PersonalTable"
import './Personal.css'

const fields = {
    nombre: {
        label: 'Nombre',
        type: 'text',
    },
    rol: {
        label: 'Rol',
        type: 'text',
    },
    contraseña: {
        label: 'Contraseña',
        type: 'password',
    },
    email: {
        label: 'Email',
        type: 'email',
    },
    acciones: {
        label: 'Acciones',
        type: 'text',
    },
};

export default function Personal() {
    return (
        <section id="personal-section">
            <h1>Personal</h1>
            <PersonalTable  fields={fields}/>
        </section>
    )
}