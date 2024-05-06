const URL = import.meta.env.VITE_API_URL

export async function deleteUserRemote(user, restaurantId) {
    try {
        const response = await fetch(`${URL}/restaurantes/${restaurantId}/users/${user._id}`, {
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
export async function updateUserRemote(user, restaurantId) {
    try {
        const response = await fetch(`${URL}/restaurantes/${restaurantId}/users/${user._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(user)
        })
        const json = await response.json()
        return {ok: response.ok, _id: json._id}
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
        const json = await response.json()
        return {ok: response.ok, _id: json._id}
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
export async function deleteTicketRemote(ticket, restaurantId) {
    try {
        const response = await fetch(`${URL}/restaurantes/${restaurantId}/tickets/${ticket._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.ok
    } catch(e) {
        console.log(e)
    }
}

export async function updatePlatoRemote(plato, restaurantId, imagen) {
    try {
        const formData = new FormData()
        if(imagen) formData.append("file", imagen)
        formData.append("datos", JSON.stringify(plato))
        const response = await fetch(`${URL}/restaurantes/${restaurantId}/platos/${plato._id || ""}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: formData
        })
        return response
    } catch(e) {
        console.log(e)
    }
}

export async function deletePlatoRemote(plato, restaurantId) {
    try {
        const response = await fetch(`${URL}/restaurantes/${restaurantId}/platos/${plato._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.ok
    } catch(e) {
        console.log(e)
    }
}