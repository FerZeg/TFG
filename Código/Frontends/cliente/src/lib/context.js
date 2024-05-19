import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export const useLoginContext = create((set) => ({
    login: { value: false, data: {} },
    updateLogin: (context) => set({ login: context }),
}))

export const useRestauranteContext = create((set) => ({
    productos: [],
    setProductos: (productos) => set({ productos }),
}))

export const useCartContext = create(
    persist((set, get) => ({
        cart: [],
        setCart: (cart) => set({ cart }),
        addProduct: (product) => {
            const index = get().cart.findIndex(p => p._id === product._id)
            if (index !== -1) {
                set(state => {
                    const cart = [...state.cart]
                    cart[index].quantity += product.quantity
                    return { cart }
                })
            } else {
                set(state => ({ cart: [...state.cart, product] }))
            }
        }
    }),
    {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
)
)

export const useNavigationContext = create((set) => ({
    active: "plato",
    setActive: (active) => set({ active }),
}))