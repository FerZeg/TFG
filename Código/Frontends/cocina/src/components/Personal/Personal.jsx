import PersonalTable from "./PersonalTable"

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
        <>
            <h3 className="section-title">Personal</h3>
            <PersonalTable  fields={fields}/>
        </>
    )
}