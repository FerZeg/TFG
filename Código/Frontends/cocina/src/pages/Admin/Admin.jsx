import DatosRestaurante from "../../components/DatosRestaurante/DatosRestaurante"
import Personal from "../../components/Personal/Personal"
import Mesas from "../../components/Mesas/Mesas"
import { useEffect } from "react"
import { useLoginContext, useRestauranteContext } from "../../lib/context"
import { fetchRestaurant } from "../../lib/fetchers"
import { useShallow } from "zustand/react/shallow"
import { toast } from "sonner"

export default function Admin() {
    const { setData } = useRestauranteContext(useShallow(state => ({
        setData: state.setData,
    })))    
    const { login } = useLoginContext()
    useEffect(() => {
        document.title = "Admin - Restaurante";
        (async() => {
            if(!await fetchRestaurant(login.data.restauranteId, setData))
                toast.error("Error al cargar los datos del restaurante")
            }
        )()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [login.data.restauranteId])
    return (
        <section id="admin" className='page'>
            {<>
                <section id="datos-restaurante" className='box-section'>
                    <DatosRestaurante/>
                </section>
                <section id="personal" className='box-section'>
                    <Personal/>
                </section>
                <section id="mesas" className='box-section'>
                    <Mesas/>
                </section>
            </>}
        </section>
    
    )
}