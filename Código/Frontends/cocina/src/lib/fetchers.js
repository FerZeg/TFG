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