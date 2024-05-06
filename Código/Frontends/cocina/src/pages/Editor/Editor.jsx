import { useEffect } from "react"
import { useRestauranteContext } from "../../lib/context"
import { useShallow } from "zustand/react/shallow"
import { fetchRestaurant } from "../../lib/fetchers"
import { useLoginContext } from "../../lib/context"
import { toast } from "sonner"
import EditorSection from "../../components/Editor/EditorSection"


export default function EditorPage() {
    const { setData, platos } = useRestauranteContext(useShallow(state => ({
      setData: state.setData,
      platos: state.platos
  })))    
  const { login } = useLoginContext()
  useEffect(() => {
      document.title = "Editor - Restaurante";
      (async() => {
          if(!await fetchRestaurant(login.data.restauranteId, setData))
              toast.error("Error al cargar los datos del restaurante")
          }
      )()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login.data.restauranteId])
  useEffect(() => {
      platos.forEach(plato => {
        if(!plato.imagen) return
          const img = new Image()
          img.src = plato.imagen
      })
  }, [platos])
  return (
    <section id='editor' className='page'>
      <EditorSection/>
    </section>
  )
}