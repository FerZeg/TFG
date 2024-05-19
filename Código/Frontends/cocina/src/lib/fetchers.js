const URL = import.meta.env.VITE_API_URL

export const fetchUserData = async () => {
    try {
        if(!localStorage.getItem("token")) return null
            const response = await fetch(`${URL}/auth/data`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
        if(response.ok) {
            const data = await response.json()
            return data
        }
    } catch(e) {
        return null
    }
}

export const fetchLogin = async (email, password) => {
    try {
        const response = await fetch(`${URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        })
        if(response.ok) {
            const data = await response.json()
            localStorage.setItem("token", data.token)
            return data.token
        }
        return null
    } catch(e) {
        return null
    }
}

export const fetchRestaurant = async (restaurantId, setData) => {
    try {
        const response = await fetch(`${URL}/restaurantes/${restaurantId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        if(response.ok) {
            const data = await response.json()
            setData(
                {
                    users: data.users.map(user => ({
                        ...user, 
                        ...user.user, 
                        alreadyExist: true, 
                        user: undefined, 
                    })),
                    platos: data.platos,
                    mesas: data.mesas,
                    restauranteData: {
                        nombre: data.nombre, 
                        direccion: data.direccion, 
                        telefono: data.telefono, 
                        contraseña_mesas: "********",
                        }
                    })
            return true
            }
        return null
    }
    catch(e) {
        return null
    }
}

export const fetchTickets = async (restaurantId, filter = null) => {
    try {
        let completeURL = `${URL}/restaurantes/${restaurantId}/tickets`
        if(filter) {
            completeURL += "?" + Object.entries(filter).map(([key, value]) => `${key}=${value}`).join("&")
        }
        const response = await fetch(completeURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.ok ? await response.json() : undefined
    } catch (e) {
        console.error(e)
        return undefined
    }
}

export const fetchPendiente = async (restaurantId) => {
    try {
        const response = await fetch(`${URL}/restaurantes/${restaurantId}/tickets/pendiente`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.ok ? await response.json() : undefined
    } catch (e) {
        console.error(e)
        return undefined
    }
}