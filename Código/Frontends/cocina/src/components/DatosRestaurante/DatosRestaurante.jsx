import './DatosRestaurante.css'

import { useState, useContext } from 'react'
import { loginContext } from '../../lib/context'
import { useEffect } from 'react'
import { fetchRestaurant } from '../../lib/fetchers'
import { updateRestaurant } from '../../lib/actions'
import { toast } from 'sonner'

export default function DatosRestaurante() {
    const [restaurant, setRestaurant] = useState({nombre: "", direccion: "", telefono: "", contraseña_mesas: "********"})
    const { login } = useContext(loginContext)
    const handleChange = (e) => {
        setRestaurant({...restaurant, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await updateRestaurant(restaurant, login.data.restauranteId)
        if(response) toast.success("Datos guardados correctamente")
        else toast.error("Error al guardar los datos")
    }
    useEffect(() => {
        (async() => {
            const data = await fetchRestaurant(login.data.restauranteId)
            if(data) setRestaurant({nombre: data.nombre, direccion: data.direccion, telefono: data.telefono, contraseña_mesas: "********"})
            }
        )()
    }, [login.data])
    return (
        <section id="datos-restaurante">
            <h1>Datos Restaurante</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" value={restaurant.nombre} onChange={handleChange} />
                    <label htmlFor="direccion">Dirección</label>
                    <input type="text" id="direccion" name="direccion" value={restaurant.direccion} onChange={handleChange} />
                    <label htmlFor="telefono">Teléfono</label>
                    <input type="text" id="telefono" name="telefono" value={restaurant.telefono} onChange={handleChange}/>
                    <label htmlFor="contraseña_mesas">Contraseña Mesas</label>
                    <input type="password" id="contraseña_mesas" name="contraseña_mesas" value={restaurant.contraseña_mesas} onChange={handleChange}/>
                    <button type="submit">Guardar</button>
                </form>
            </div>
        </section>
    )
}