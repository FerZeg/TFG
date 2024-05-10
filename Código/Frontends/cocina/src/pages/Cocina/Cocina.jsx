import { useEffect } from "react"
import "./Cocina.css"
import { useLoginContext } from "../../lib/context"
import { usePendientesContext } from "../../lib/context"
import { fetchPendiente } from "../../lib/fetchers"
import { useShallow } from "zustand/react/shallow"
import { Pedidos } from "../../components/Pedidos/Pedidos"

export default function Cocina() {
  const { login } = useLoginContext()
  const { setPendientes } = usePendientesContext(useShallow(state => ({
    setPendientes: state.setPendientes
  }))
  )
  useEffect(() => {
    document.title = "Cocina - Restaurante"
    fetchPendiente(login.data.restauranteId)
      .then(data => setPendientes(data))
      .catch(err => console.error(err))
  }, [login, setPendientes])
  return (
    <section id="pedidos" className='page'>
          <Pedidos/>
    </section>
  )
}