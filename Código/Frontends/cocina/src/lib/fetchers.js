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

export const fetchRestaurant = async (restaurantId) => {
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
            return data
        }
        return null
    }
    catch(e) {
        return null
    }
}
/*export const fetchPersonal = async (restaurantId) => {
    try {
        const response = await fetch(`${URL}/restaurantes/${restaurantId}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.ok ? await response.json() : undefined;
    } catch (e) {
        return undefined;
    }
}*/

export const fetchTickets = async (restaurantId) => {
    try {
        const response = await fetch(`${URL}/restaurantes/${restaurantId}/tickets`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.ok ? await response.json() : undefined;
    } catch (e) {
        return undefined;
    }
}