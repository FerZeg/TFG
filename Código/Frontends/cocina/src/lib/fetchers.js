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
            return true
        }
        return false
    } catch(e) {
        return false
    }
}