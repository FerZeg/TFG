import { create } from "zustand"

export const useLoginContext = create((set) => ({
    login: { value: false, data: {} },
    updateLogin: (context) => set({ login: context }),
}))

export const useTicketsContext = create((set) => ({
    tickets: [],
    setTickets: (tickets) => set({ tickets }),
    removeTicket: (ticket) => set((state) => ({ tickets: state.tickets.filter((t) => t._id !== ticket._id) })),
    updateTicket: (oldTicket, newTicket) => set((state) => ({ tickets: state.tickets.map((t) => t._id === oldTicket._id ? newTicket : t) })),
}))

export const createRestauranteDataSlice = (set) => ({
    restauranteData: {nombre: "", direccion: "", telefono: "", contraseña_mesas: "********"},
    updateRestauranteData: (data) => set({ restauranteData: data }),
})

export const createMesasSlice = (set) => ({
    mesas: [],
    addMesa: (mesa) => set((state) => {
        mesa.alreadyExist = false
        mesa._id = crypto.randomUUID()
        return ({ mesas: [...state.mesas, mesa ] })
    }),
    removeMesa: (mesa) => set((state) => ({ mesas: state.mesas.filter((m) => m._id !== mesa._id) })),
    updateMesa: (oldMesa, newMesa) => set((state) => ({ mesas: state.mesas.map((m) => m._id === oldMesa._id ? newMesa : m) })),
})

export const createPlatosContext = (set) => ({
    platos: [],
    removePlato: (plato) => set((state) => ({ platos: state.platos.filter((p) => p._id !== plato._id) })),
    updatePlato: (oldPlato, newPlato) => set((state) => ({ platos: state.platos.map((p) => p._id === oldPlato._id ? newPlato : p) })),
    addPlato: (plato) => set((state) => {
        console.log(plato)
        return { platos: [...state.platos, plato]}
        }
    ),
    
})

export const createUsersSlice = (set) => ({
    users: [],
    addUser: (user) => set((state) => {
        user.alreadyExist = false
        user._id = crypto.randomUUID()
        return ({ users: [...state.users, user] })
    }),
    removeUser: (user) => set((state) => ({ users: state.users.filter((u) => u._id !== user._id) })),
    updateUser: (oldUser, newUser) => set((state) => ({ users: state.users.map((u) => u._id === oldUser._id ? newUser : u) })),
    setUsers: (users) => set({ users }),
})

export const useRestauranteContext = create((set) => ({
    ...createRestauranteDataSlice(set),
    ...createMesasSlice(set),
    ...createPlatosContext(set),
    ...createUsersSlice(set),
    setData: (data) => {
        if(data.users) {
            data.users.forEach((u) => {
                u.alreadyExist = true
                u.password = "********"
            })
        }
        if(data.mesas)
            data.mesas.forEach((m) => m.alreadyExist = true)
        set(data)
    },
}))