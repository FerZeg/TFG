const URL = import.meta.env.VITE_API_URL

export async function deleteUserRemote(id, restaurantId) {
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
export async function createUserRemote(user, restaurantId) {
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
export async function updateUserRemote(user, restaurantId, id) {
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

export async function updateRestaurantRemote(restaurant, restaurantId) {
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

export async function updateMesaRemote(mesa, restaurantId) {
    try {
        const response = await fetch(`${URL}/restaurantes/${restaurantId}/mesas/${mesa._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(mesa)
        })
        return response.ok
    } catch(e) {
        return null
    }
}
export async function deleteMesaRemote(mesa, restaurantId) {
    try {
        const response = await fetch(`${URL}/restaurantes/${restaurantId}/mesas/${mesa._id}`, {
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