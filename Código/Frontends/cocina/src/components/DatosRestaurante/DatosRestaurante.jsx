import './DatosRestaurante.css'

import { useLoginContext } from '../../lib/context'
import { useEffect } from 'react'
import { fetchRestaurant } from '../../lib/fetchers'
import { updateRestaurantRemote } from '../../lib/actions'
import { toast } from 'sonner'
import { useRestauranteContext } from '../../lib/context'

export default function DatosRestaurante() {
    const { restauranteData, updateRestauranteData } = useRestauranteContext()
    const { login } = useLoginContext()
    const handleChange = (e) => {
        updateRestauranteData({...restauranteData, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await updateRestaurantRemote(restauranteData, login.data.restauranteId)
        if(response) toast.success("Datos guardados correctamente")
        else toast.error("Error al guardar los datos")
    }
    useEffect(() => {
        (async() => {
            const data = await fetchRestaurant(login.data.restauranteId)
            if(data)  updateRestauranteData({nombre: data.nombre, direccion: data.direccion, telefono: data.telefono, contraseña_mesas: "********"})
            }
        )()
    }, [login.data.restauranteId, updateRestauranteData])
    return (
        <section id="datos-restaurante">
            <h1>Datos Restaurante</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" value={restauranteData?.nombre} onChange={handleChange} />
                    <label htmlFor="direccion">Dirección</label>
                    <input type="text" id="direccion" name="direccion" value={restauranteData?.direccion} onChange={handleChange} />
                    <label htmlFor="telefono">Teléfono</label>
                    <input type="text" id="telefono" name="telefono" value={restauranteData?.telefono} onChange={handleChange}/>
                    <label htmlFor="contraseña_mesas">Contraseña Mesas</label>
                    <input type="password" id="contraseña_mesas" name="contraseña_mesas" value={restauranteData?.contraseña_mesas} onChange={handleChange}/>
                    <button type="submit">Guardar</button>
                </form>
            </div>
        </section>
    )
}