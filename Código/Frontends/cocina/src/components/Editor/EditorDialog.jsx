import PropTypes from "prop-types"

export default function EditorDialog({plato, setDialogIsOpen})  {
    const handleClose = () => {
        setDialogIsOpen({isOpen: false, plato: null})
    }
    return (
        <div className="dialog-container">
            <div className="backdrop" onClick={handleClose}></div>
            <div className="dialog">
                <h1>Editor Dialog</h1>
                <p>{plato.nombre}</p>
            </div>
        </div>
    )
}

EditorDialog.propTypes = {
    plato: PropTypes.object.isRequired,
    setDialogIsOpen: PropTypes.func.isRequired
}