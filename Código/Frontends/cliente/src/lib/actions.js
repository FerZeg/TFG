const URL = import.meta.env.VITE_API_URL

export const createPedido = async (pedido, data, ticket) => {
    const restauranteId  = data.restaurante._id
    try {
        const response = await fetch(URL + "/restaurantes/" + restauranteId + "/tickets/" + ticket + "/pedido", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            productos: pedido.map(p => {
                return {
                    plato: p._id,
                    cantidad: p.quantity
                    }
                })
            })
        })
        if(!response.ok) throw new Error(response.statusText)
        return response.json()
    } catch(error) {
        throw new Error(error)
    }
}

export const createTicket = async (data) => {
    console.log(data)
    const restauranteId  = data.restaurante._id
    const mesaId = data.mesa._id
    try {
        const response = await fetch(URL + "/restaurantes/" + restauranteId + "/mesas/" + mesaId + "/ticket", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                identificador: data.mesa.identificador
            })
        })
        if(!response.ok) throw new Error(response.statusText)
        return response.json()
    } catch (error) {
        throw new Error(error)
    }
}