import { useEffect, useState } from "react"
import { useLoginContext, useRestauranteContext } from "../../lib/context"
import { useShallow } from "zustand/react/shallow"
import "./EditorSection.css"
import Dialog from "../mainUI/Dialog"
import FormEditPlato from "./FormEditPlato"
import { updatePlatoRemote } from "../../lib/actions"
import { toast } from "sonner"

export default function EditorSection() {
    const { platos, updatePlato } = useRestauranteContext(useShallow(state => {
        return {
            platos: state.platos,
            updatePlato: state.updatePlato

        }
    }))
    const { login } = useLoginContext()

    const [filtro, setFiltro] = useState({
        tipo: "todos",
        estado: "true"
    })
    const [platosFiltrados, setPlatosFiltrados] = useState([])
    const [search, setSearch] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState({
        isOpen: false,
        plato: null
    })

    useEffect(() => {
        console.log(platos)
        let filteredPlatos = []
        if(filtro.tipo === "todos") {
            filteredPlatos = platos
        } else {
            filteredPlatos = platos.filter(plato => plato.tipo === filtro.tipo)
        }
        if(filtro.estado !== null && filtro.estado !== "todos") {
            filteredPlatos = filteredPlatos.filter(plato => {
                return plato.active === (filtro.estado === "true")
            })
        }

        const platosFiltrados = filteredPlatos.filter(plato => {
            const nombre = plato.nombre.toLowerCase()
            const searchTerm = search.toLowerCase()
            return nombre.includes(searchTerm)
        })

        setPlatosFiltrados(platosFiltrados)
    }, [filtro, platos, search])

    const handleSubmit = async (plato, imagen) => {
        const oldPlato = isDialogOpen.plato
        if(await updatePlatoRemote(plato, login.data.restauranteId, imagen)) {
            updatePlato(oldPlato, plato)
            setIsDialogOpen({isOpen: false, plato: null})
            toast.success("Plato actualizado correctamente")
        } else {
            toast.error("Error al actualizar el plato")
        }

    }


    return (
        <div className="box-section"> 
            <div className="filter-section">
                <div className="select-filters">
                    <select 
                        name="tipofiltro" 
                        id="tipofiltro" 
                        value={filtro.tipo} 
                        onChange={(e) => setFiltro(oldState => ({...oldState, tipo: e.target.value}))}
                        className="filter"
                        >
                        <option value="todos">Todos</option>
                        <option value="plato">Platos</option>
                        <option value="bebida">Bebidas</option>
                        <option value="postre">Postres</option>
                    </select>
                    <select 
                        name="estadofiltro" 
                        id="estadofiltro" 
                        value={filtro.estado} 
                        onChange={(e) => setFiltro(oldState => ({...oldState, estado: e.target.value}))}
                        className="filter"
                        >
                        <option value="todos">Todos</option>
                        <option value="true">Activos</option>
                        <option value="false">Inactivos</option>
                    </select>
                </div>
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
                    <div key={plato._id} className="plato-box">
                        {
                            plato.imagen && 
                            <img src={plato.imagen} alt={plato.nombre}/>
                        }
                        {
                            !plato.imagen && 
                            <img src="Placeholder.svg" alt={plato.nombre} />
                        }
                        <p><span className="text-l">{plato.nombre}</span></p>
                        <button 
                            onClick={() => setIsDialogOpen({isOpen: true, plato: plato})}
                        >
                            Editar
                        </button>
                    </div>
                ))}
            </div>
            {isDialogOpen.isOpen && 
                <Dialog setDialogIsOpen={setIsDialogOpen}>
                    <FormEditPlato
                        plato={isDialogOpen.plato}
                        handleSubmit={handleSubmit}
                    />
                </Dialog>
            }
        </div>
    )
}