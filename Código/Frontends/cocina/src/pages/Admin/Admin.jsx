import './Admin.css'
import DatosRestaurante from "../../components/DatosRestaurante/DatosRestaurante";
import Personal from "../../components/Personal/Personal";
import Mesas from "../../components/Mesas/Mesas";
import { useEffect } from 'react';
import { useLoginContext, useRestauranteContext } from '../../lib/context';
import { fetchRestaurant } from '../../lib/fetchers';

export default function Admin() {
    const { setData } = useRestauranteContext()    
    const { login } = useLoginContext()
    useEffect(() => {
        document.title = "Admin - Restaurante";
        (async() => {
            const data = await fetchRestaurant(login.data.restauranteId)
            if(data) {
                setData({
                    users: data.users.map(user => ({
                        ...user, 
                        ...user.user, 
                        alreadyExist: true, 
                        user: undefined
                    })),
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
            }
        )()
    }, [setData, login.data.restauranteId])
    return (
        <section id="admin" className='page'>
            <DatosRestaurante/>
            <Personal/>
            <Mesas/>
        </section>
    )
}