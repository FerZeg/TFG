import { useEffect, useState } from "react"
import { useRestauranteContext } from "../../lib/context"
import { useShallow } from "zustand/react/shallow"
import "./EditorSection.css"
import Dialog from "../mainUI/Dialog"

export default function EditorSection() {
    const { platos } = useRestauranteContext(useShallow(state => {
        return {
            platos: state.platos
        }
    }))
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
        console.log(filtro)

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
                <Dialog
                    setDialogIsOpen={setIsDialogOpen}
                >
                    <h1>Editar Plato</h1>
                    <form>
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" name="nombre" id="nombre" value={isDialogOpen.plato.nombre}/>
                        <label htmlFor="precio">Precio</label>
                        <input type="number" name="precio" id="precio" value={isDialogOpen.plato.precio}/>
                        <label htmlFor="tipo">Tipo</label>
                        <select name="tipo" id="tipo" value={isDialogOpen.plato.tipo}>
                            <option value="plato">Plato</option>
                            <option value="bebida">Bebida</option>
                            <option value="postre">Postre</option>
                        </select>
                        <label htmlFor="active">Activo</label>
                        <select name="active" id="active" value={isDialogOpen.plato.active}>
                            <option value="true">Activo</option>
                            <option value="false">Inactivo</option>
                        </select>
                        <label htmlFor="imagen">Imagen</label>
                        <input type="file" name="imagen" id="imagen"/>
                        <button type="submit">Guardar</button>
                    </form>
                </Dialog>

            }
        </div>
    )
}