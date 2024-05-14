import { create } from "zustand"   

export const useLoginContext = create((set) => ({
    login: { value: false, data: {} },
    updateLogin: (context) => set({ login: context }),
}))

export const useRestauranteContext = create((set) => ({
    productos: [],
    setProdutos: (productos) => set({ productos }),
}))

export const useCartContext = create((set) => ({
    cart: [],
    setCart: (cart) => set({ cart }),
    addProduct: (product) => set(state => ({ cart: [...state.cart, product] })),
}))