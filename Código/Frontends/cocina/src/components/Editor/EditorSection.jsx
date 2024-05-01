import { useRestauranteContext } from "../../lib/context"

export default function EditorSection() {
    const { platos } = useRestauranteContext()
    console.log(platos)
    return (
        <div className="box-section">
            {platos.map(plato => (
                <div key={plato._id}>
                    <h2>{plato.nombre}</h2>
                    <p>{plato.descripcion}</p>
                    <p>{plato.precio} €</p>
                </div>
            ))
            }
        </div>
    )
}