import PropTypes from "prop-types"
import { useState } from "react"

export default function FormEditPlato({plato, handleSubmit, handleDelete}) {
    const [state, setState] = useState({
        _id: plato?._id,
        nombre: plato?.nombre || "",
        precio: plato?.precio || 0,
        tipo: plato?.tipo || "plato",
        active: plato?.active || false,
        imagen: plato?.imagen || ""
    })
    const [previewImage, setPreviewImage] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }
    const handleChange = (e) => {
        setState(oldState => ({...oldState, [e.target.name]: e.target.value}))
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()
        handleSubmit(state, e.target.imagen.files[0] || null)
    }

    return (
        <>
        <h2>{plato ? "Editar plato" : "Añadir plato"}</h2>
        <form  onSubmit={handleFormSubmit}>
        <img 
            src={previewImage || state.imagen || "Placeholder.svg"} 
            alt="" className="dialog-img"
        />
            <div className="input-wrapper">
                <label htmlFor="nombre">Nombre:</label>
                <input 
                    type="text" 
                    name="nombre" 
                    id="nombre" 
                    value={state.nombre} 
                    onChange={handleChange}
                    />
            </div>
            <div className="input-wrapper">
                <label htmlFor="precio">Precio:</label>
                <input type="number" name="precio" id="precio" value={state.precio} onChange={handleChange}/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="tipo">Tipo:</label>
                <select name="tipo" id="tipo" value={state.tipo} onChange={handleChange}>
                    <option value="plato">Plato</option>
                    <option value="bebida">Bebida</option>
                    <option value="postre">Postre</option>
                </select>
            </div>
            <div className="input-wrapper">
                <label htmlFor="active">Activo:</label>
                <select name="active" id="active" value={state.active} onChange={handleChange}>
                    <option value={true}>Activo</option>
                    <option value={false}>Inactivo</option>
                </select>
            </div>
            <div className="input-wrapper">
                <label htmlFor="imagen">Imagen:</label>
                <input type="file" name="imagen" id="imagen" accept="image/*" onChange={handleImageChange}/>
            </div>
            {plato &&
            <>
            <button type="submit">Guardar</button>
            <button type='button' onClick={() => handleDelete(plato)}>Eliminar</button>
            </>
            }
            {!plato &&
            <button type="submit">Añadir</button>
            }
        </form>
        </>
    )
}

FormEditPlato.propTypes = {
    plato: PropTypes.object,
    handleSubmit: PropTypes.func,
    handleDelete: PropTypes.func,
    isNew: PropTypes.bool
}