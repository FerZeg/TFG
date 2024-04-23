import './Admin.css'
import DatosRestaurante from "../../components/DatosRestaurante/DatosRestaurante";
import Personal from "../../components/Personal/Personal";
import Mesas from "../../components/Mesas/Mesas";
import { useEffect } from 'react';
import { useLoginContext, useRestauranteContext } from '../../lib/context';
import { fetchRestaurant } from '../../lib/fetchers';

export default function Admin() {
    const { set } = useRestauranteContext()    
    const { login } = useLoginContext()
    useEffect(() => {
        document.title = "Admin - Restaurante";
        (async() => {
            const data = await fetchRestaurant(login.data.restauranteId)
            if(data)
                set({
                    users: data.users.map(user => ({...user, alreadyExist: true})),
                    platos: data.platos,
                    mesas: data.mesas,
                    restauranteData: {
                        nombre: data.nombre, 
                        direccion: data.direccion, 
                        telefono: data.telefono, 
                        contraseña_mesas: "********"
                    }
                })
            }
        )()
    }, [set, login.data.restauranteId])
    return (
        <section id="admin">
            <DatosRestaurante/>
            <Personal/>
            <Mesas/>
        </section>
    )
}