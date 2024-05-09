import { useEffect } from "react"
import "./Cocina.css"
import { fetchTickets } from "../../lib/fetchers"
import { useLoginContext } from "../../lib/context"

export default function Cocina() {
  const { login } = useLoginContext()
  useEffect(() => {
    document.title = "Cocina - Restaurante"
    fetchTickets(login.data.restauranteId, {status: "ABIERTO"})
      .then(data => console.log(data))
  }, [login])
  return (
    <></>
  )
}