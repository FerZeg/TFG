import { useEffect } from "react"
import "./Cocina.css"
import { useLoginContext } from "../../lib/context"
import { usePendientesContext } from "../../lib/context"
import { useShallow } from "zustand/react/shallow"
import { Pedidos } from "../../components/Pedidos/Pedidos"

export default function Cocina() {
  const { login } = useLoginContext()
  const { fetchPendientes } = usePendientesContext(useShallow(state => ({
      fetchPendientes: state.fetchPendientes
  }))
  )
  useEffect(() => {
    document.title = "Cocina - Restaurante"
    fetchPendientes(login.data.restauranteId)
    const interval = setInterval(() => {
        fetchPendientes(login.data.restauranteId)
    }, 10000)
    return () => clearInterval(interval)
  }, [login, fetchPendientes])
  return (
    <section id="pedidos" className='page'>
          <Pedidos/>
    </section>
  )
}