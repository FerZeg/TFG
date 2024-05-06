import { useEffect, useState } from "react"
import { useLoginContext, useRestauranteContext } from "../../lib/context"
import { useShallow } from "zustand/react/shallow"
import "./EditorSection.css"
import Dialog from "../mainUI/Dialog"
import FormEditPlato from "./FormEditPlato"
import { updatePlatoRemote, deletePlatoRemote} from "../../lib/actions"
import { toast } from "sonner"

export default function EditorSection() {
    const { platos, updatePlato, removePlato, addPlato } = useRestauranteContext(useShallow(state => {
        return {
            platos: state.platos,
            updatePlato: state.updatePlato,
            removePlato: state.removePlato,
            addPlato: state.addPlato

        }
    }))
    const { login } = useLoginContext()

    const [filtro, setFiltro] = useState({
        tipo: "todos",
        estado: "todos"
    })
    const [platosFiltrados, setPlatosFiltrados] = useState([])
    const [search, setSearch] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState({
        isOpen: false,
        plato: null
    })

    useEffect(() => {
        console.log(filtro)
        let filteredPlatos = []
        console.log(platos)
        if(filtro.tipo === "todos") {
            filteredPlatos = platos
        } else {
            filteredPlatos = platos.filter(plato => plato.tipo === filtro.tipo)
        }
        if(filtro.estado !== null && filtro.estado !== "todos") {
            filteredPlatos = filteredPlatos.filter(plato => {
                return String(plato.active) === String(filtro.estado)
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
        const response = await updatePlatoRemote(plato, login.data.restauranteId, imagen)
        const newPlato = await response.json()
        if(!response.ok) {
            return toast.error("Error al actualizar el plato")
        }
        if(!plato._id) {
            addPlato(newPlato)
        } else {
            updatePlato(oldPlato, newPlato)
        }
        setIsDialogOpen({isOpen: false, plato: null})
        toast.success("Plato actualizado correctamente")
    }


    const handleDelete = async (plato) => {
        if(await deletePlatoRemote(plato, login.data.restauranteId)) {
            removePlato(plato)
            setIsDialogOpen({isOpen: false, plato: null})
            toast.success("Plato eliminado correctamente")
        } else {
            toast.error("Error al eliminar el plato")
        }
    }

    const handleAdd = () => {
        setIsDialogOpen({isOpen: true, plato: null})
    }


    return (
        <div className="box-section"> 
            <div className="filter-section">
                <div className="select-filters">
                    <div className="flex-group mobile">
                        <div className="flex-group">
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
                    <button
                        onClick={handleAdd}
                    >
                        Añadir
                    </button>
                </div>
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
                        handleDelete={handleDelete}
                    />
                </Dialog>
            }
        </div>
    )
}