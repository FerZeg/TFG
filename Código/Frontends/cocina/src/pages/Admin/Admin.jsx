import DatosRestaurante from "../../components/DatosRestaurante/DatosRestaurante";
import Personal from "../../components/Personal/Personal";
import Mesas from "../../components/Mesas/Mesas";
import { useEffect } from 'react';
import { useLoginContext, useRestauranteContext } from '../../lib/context';
import { fetchRestaurant } from '../../lib/fetchers';
import { useShallow } from "zustand/react/shallow";

export default function Admin() {
    const { setData } = useRestauranteContext(useShallow(state => ({
        setData: state.setData,
    })))    
    const { login } = useLoginContext()
    console.log("render")
    useEffect(() => {
        console.log("useEffect")
        document.title = "Admin - Restaurante";
        (async() => {
            const data = await fetchRestaurant(login.data.restauranteId)
            if(data) {
                setData({
                    users: data.users.map(user => ({
                        ...user, 
                        ...user.user, 
                        alreadyExist: true, 
                        user: undefined, 
                    })),
                    platos: data.platos,
                    mesas: data.mesas,
                    restauranteData: {
                        nombre: data.nombre, 
                        direccion: data.direccion, 
                        telefono: data.telefono, 
                        contraseña_mesas: "********",
                    }
                })
            }
            }
        )()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [login.data.restauranteId])
    return (
        <section id="admin" className='page'>
            { 
                <>
            <section id="datos-restaurante" className='box-section'>
                <DatosRestaurante/>
            </section>
            <section id="personal" className='box-section'>
                <Personal/>
            </section>
            <section id="mesas" className='box-section'>
                <Mesas/>
            </section>
            </>
            }
        </section>
    
    )
}