import { useEffect, useState } from "react"
import { useRestauranteContext } from "../../lib/context"
import { useShallow } from "zustand/react/shallow"
import "./EditorSection.css"

export default function EditorSection() {
    const { platos } = useRestauranteContext(useShallow(state => {
        return {
            platos: state.platos
        }
    }))
    const [filtro, setFiltro] = useState("todos")
    const [platosFiltrados, setPlatosFiltrados] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        console.log(platos)
        let filteredPlatos = []
        if (filtro === "todos") {
            filteredPlatos = platos
        } else {
            filteredPlatos = platos.filter(plato => plato.tipo === filtro)
        }

        const platosFiltrados = filteredPlatos.filter(plato => {
            const nombre = plato.nombre.toLowerCase()
            const searchTerm = search.toLowerCase()
            return nombre.includes(searchTerm)
        })

        setPlatosFiltrados(platosFiltrados)
    }, [filtro, platos, search])


    return (
        <div className="box-section">
            <div className="filter-section">
                <select 
                    name="filtro" 
                    id="filtro" 
                    value={filtro} 
                    onChange={(e) => setFiltro(e.target.value)}
                    className="filter"
                    
                    >
                    <option value="todos">Todos</option>
                    <option value="plato">Platos</option>
                    <option value="bebida">Bebidas</option>
                    <option value="postre">Postres</option>
                </select>
                <input 
                    type="search" 
                    name="buscar" 
                    id="buscar" 
                    value={search} 
                    onChange={(e) => {setSearch(e.target.value)}}
                    placeholder="Buscar plato..."
                />
            </div>
            <div className="platos-container">
                {platosFiltrados.map(plato => (
                    <div key={plato._id} className="flex-editor">
                        <p><span className="text-l">{plato.nombre}</span></p>
                        <p>{plato.descripcion}</p>
                        <p>{plato.precio} €</p>
                    </div>
                ))}
            </div>
        </div>
    )
}