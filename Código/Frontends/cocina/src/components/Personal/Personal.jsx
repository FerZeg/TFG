import { useState, useEffect } from "react"
import PersonalTable from "./PersonalTable"
import { fetchPersonal } from "../../lib/fetchers"
import { useLoginContext } from "../../lib/context";
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
    const [personal, setPersonal] = useState([])
    const { login } = useLoginContext()
    useEffect(() => {
        fetchPersonal(login.data.restauranteId).then((data) => {
            if(data) setPersonal(data)
        })
    }, [login])
    return (
        <section id="personal-section">
            <h1>Personal</h1>
            <PersonalTable  personal={personal} fields={fields} setPersonal={setPersonal}/>
        </section>
    )
}