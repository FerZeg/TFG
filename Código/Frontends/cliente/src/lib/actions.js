const URL = import.meta.env.VITE_API_URL

export const createPedido = (pedido, data) => {
    const { restauranteId, mesaId } = data
    return fetch(URL + "/restaurante/" + restauranteId + "/mesa/" + mesaId + "/pedido", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pedido)
    })
}

export const createTicket = (data) => {
    console.log(data)
    const restauranteId  = data.restaurante._id
    const mesaId = data.mesa._id
    return fetch(URL + "/restaurantes/" + restauranteId + "/mesas/" + mesaId + "/ticket", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            identificador: data.mesa.identificador
        })
    })
}