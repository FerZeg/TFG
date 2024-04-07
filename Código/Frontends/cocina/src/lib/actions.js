const URL = import.meta.env.VITE_API_URL

export async function deleteUser(restaurantId, id) {
    try {
        const response = await fetch(`${URL}/restaurantes/${restaurantId}/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.ok
    } catch(e) {
        return null
    }
}
export async function createUser(user, restaurantId) {
    try {
        const response = await fetch(`${URL}/restaurantes/${restaurantId}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(user)
        })
        return response
    } catch(e) {
        return null
    }
}