import { useTicketContext, useLoginContext } from "../lib/context"

const URL = import.meta.env.VITE_API_URL

export async function fetchMesaLogin(email, mesa, password) {
    try {
        const response = await fetch(URL + "/auth/mesa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, mesa, password})
        })
        if(response.status === 200) {
            return response.json()
        }
        throw new Error(`Error: ${response.status}`)
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function fetchMesaData() {
    try {
        const token = localStorage.getItem("token")
        if(!token) {
            return null
        }
        const response = await fetch(`${URL}/auth/mesa`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if(response.status === 200) {
            return response.json()
        }
        throw new Error(`Error: ${response.status}`)
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function fetchProductos(data) {
    try {
        const response = await fetch(`${URL}/restaurantes/${data.restaurante._id}/platos?active`)
        if(response.status === 200) {
            return response.json()
        }
        throw new Error(`Error: ${response.status}`)
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function fetchTicket() {
    const ticket = useTicketContext.getState().ticket
    const restauranteId = useLoginContext.getState().login.data.restaurante._id
    try {
        const response = await fetch(`${URL}/restaurantes/${restauranteId}/tickets/${ticket}`)
        if(response.status === 200) {
            return response.json()
        }
        throw new Error(`Error: ${response.status}`)
    } catch (error) {
        console.error(error)
        return null
    }
}
