const URL = import.meta.env.VITE_API_URL

export async function deleteUser(id, restaurantId) {
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
export async function updateUser(user, restaurantId, id) {
    try {
        const response = await fetch(`${URL}/restaurantes/${restaurantId}/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(user)
        })
        return response.ok
    } catch(e) {
        return null
    }
}

export async function updateRestaurant(restaurant, restaurantId) {
    try {
        const response = await fetch(`${URL}/restaurantes/${restaurantId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(restaurant)
        })
        return response.ok
    } catch(e) {
        return null
    }
}