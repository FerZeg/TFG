import { create } from 'zustand'

export const useLoginContext = create((set) => ({
    login: { value: false, data: {} },
    updateLogin: (context) => set({ login: context }),
}))

export const createRestauranteDataSlice = (set) => ({
    restauranteData: {nombre: "", direccion: "", telefono: "", contraseña_mesas: "********"},
    updateRestauranteData: (data) => set({ restauranteData: data }),
})

export const createMesasSlice = (set) => ({
    mesas: [],
    addMesa: (mesa) => set((state) => ({ mesas: [...state.mesas, mesa] })),
    removeMesa: (mesa) => set((state) => ({ mesas: state.mesas.filter((m) => m._id !== mesa._id) })),
    updateMesa: (mesa) => set((state) => ({ mesas: state.mesas.map((m) => m._id === mesa._id ? mesa : m) })),
})

export const createPlatosContext = (set) => ({
    platos: [],
    addPlato: (plato) => set((state) => ({ platos: [...state.platos, plato] })),
    removePlato: (plato) => set((state) => ({ platos: state.platos.filter((p) => p._id !== plato._id) })),
    
})

export const createUsersSlice = (set) => ({
    users: [],
    addUser: (user) => set((state) => ({ users: [...state.users, user] })),
    removeUser: (user) => set((state) => ({ users: state.users.filter((u) => u.user._id !== user.user._id) })),
    updateUser: (user) => set((state) => ({ users: state.users.map((u) => u.user._id === user.user._id ? user : u) })),
    setUsers: (users) => set({ users }),
})

export const useRestauranteContext = create((set) => ({
    ...createRestauranteDataSlice(set),
    ...createMesasSlice(set),
    ...createPlatosContext(set),
    ...createUsersSlice(set),
    set: (data) => set(data),
}))