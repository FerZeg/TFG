import { useRestauranteContext } from "../../lib/context"

export default function EditorSection() {
    const { platos } = useRestauranteContext()
    return (
        <>
            {platos.map(plato => (
                <div key={plato.id}>
                    <h2>{plato.nombre}</h2>
                    <p>{plato.descripcion}</p>
                    <p>{plato.precio} €</p>
                </div>
            ))
            }
        </>
    )
}