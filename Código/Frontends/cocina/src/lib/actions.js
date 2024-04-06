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
        return await response.json()
    } catch(e) {
        return null
    }
}