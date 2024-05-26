import { updateProductStatus, updateProductQuantity } from "../../lib/actions"
import Dialog from "../mainUI/Dialog"
import NumberInput from "../mainUI/NumberInput"
import PropTypes from "prop-types"
import { useLoginContext } from "../../lib/context"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { usePendientesContext } from "../../lib/context"
import { useShallow } from "zustand/react/shallow"

export default function PedidosActions(props) {
  const { producto, isOpen } = props.dialog
  const { login } = useLoginContext()
  const setDialog = props.setDialog
  const [currentQuantity, setCurrentQuantity] = useState(1)
  const { fetchPendientes } = usePendientesContext(useShallow(state => ({
    fetchPendientes: state.fetchPendientes
  })))

  useEffect(() => {
    if (producto) {
      setCurrentQuantity(1) // Reset to default when a new product is selected
    }
  }, [producto])

  const cantidad = producto?.cantidad - producto?.hechos || 1

  const submitQuantity = async () => {
    const response = await updateProductQuantity(producto, currentQuantity, login.data.restauranteId)
    if (!response) return toast.error("Error al actualizar la cantidad")
    setDialog({
      producto: null,
      isOpen: false
    })
    toast.success("Cantidad actualizada")
    fetchPendientes(login.data.restauranteId)
  }

  const cancelProduct = async () => {
    const response = await updateProductStatus(producto, "CANCELADO", login.data.restauranteId)
    if (!response) return toast.error("Error al cancelar el pedido")
    toast.success("Pedido cancelado")
    setDialog({
      producto: null,
      isOpen: false
    })
    fetchPendientes(login.data.restauranteId)
  }

  return (
    <>
      {producto && isOpen && (
        <Dialog setDialogIsOpen={setDialog}>
          <h1>{producto.nombre}</h1>
          <NumberInput
            max={cantidad}
            number={currentQuantity}
            setNumber={setCurrentQuantity}
          />
          <button onClick={submitQuantity}>Hecho</button>
          <button onClick={cancelProduct}>Cancelar pedido</button>
        </Dialog>
      )}
    </>
  )
}

PedidosActions.propTypes = {
  dialog: PropTypes.object,
  setDialog: PropTypes.func.isRequired,
}
