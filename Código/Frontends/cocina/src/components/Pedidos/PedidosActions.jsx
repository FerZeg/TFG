import Dialog from "../mainUI/Dialog"
import NumberInput from "../mainUI/NumberInput"
import PropTypes from "prop-types"

export default function PedidosActions({dialog, setDialog}) {
    const product = dialog?.producto
    const cantidad = product?.cantidad - product?.hechos || 1
    return (
        <>
        {dialog && product && dialog.isOpen &&
        <Dialog setDialogIsOpen={setDialog}>
            <h1>{product.nombre}</h1>
            <NumberInput
                max={cantidad}                    
            />
            <button>abc</button>
        </Dialog>
        }
        </>
  )
}

PedidosActions.propTypes = {
    dialog: PropTypes.object,
    setDialog: PropTypes.func.isRequired
}
