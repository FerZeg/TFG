import { create } from "zustand"   

export const useLoginContext = create((set) => ({
    login: { value: false, data: {} },
    updateLogin: (context) => set({ login: context }),
}))