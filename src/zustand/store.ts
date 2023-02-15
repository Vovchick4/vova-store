import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { persist } from "zustand/middleware";
import dataCart from "./data";
import { removeAuthToken, setAuthToken } from "../config/axios";

export enum Filter {
    beloved = 'beloved', favorites = 'favorites',
}

export interface ICartItemProps {
    id: string, name: string, desc: string, img: string, price: number, count?: number, /*filter?: string*/
}

export interface IUserProps {
    data: IUserDataProps | null,
    accessToken: string | null
}

export interface IUserDataProps {
    id: number
    sokcetId: string
    nickName: string
    email: string
    password: string
}

export interface IAddNewFilterItemProps {
    id: string,
    filter: string
}

export interface IStoreProps {
    user: IUserProps,
    cart: Array<ICartItemProps>,
    beloved: Array<ICartItemProps>,
    favorites: Array<ICartItemProps>,
    // items: Array<ICartItemProps>,
    searchText: string,
    visibleSidebar: boolean,
    setUser: (data: IUserProps) => void,
    clearUser: () => void,
    addItemToColumn: (type: Filter, data: ICartItemProps) => void,
    removeItemFromColumn: (type: Filter, itemId: string) => void,
    // setNewFilterItem: (data: IAddNewFilterItemProps) => void,
    // removeFilterItems: (cartId: string) => void,
    setToCart: (data: ICartItemProps[]) => void,
    addToCart: (data: ICartItemProps) => void,
    incrementCartItemCount: (cartId: string) => void,
    decrementCartItemCount: (cartId: string) => void,
    clearCart: () => void,
    deleteCartItemById: (cartId: string) => void,
    inputSearchText: (text: string) => void,
    toggleVisibilitySidebar?: () => void,
}

export const useStore = create<IStoreProps>()(
    persist(
        (set) => ({
            user: {
                data: null,
                accessToken: null,
            },
            cart: [],
            beloved: [],
            favorites: [],
            // items: dataCart,
            searchText: "",
            visibleSidebar: false,
            setUser: (data: IUserProps) => set((state) => {
                setAuthToken(data.accessToken)
                return { ...state, user: data }
            }),
            clearUser: () => set((state) => {
                removeAuthToken()
                return { ...state, user: { data: null, accessToken: null } }
            }),
            addItemToColumn: (type, data) => set((state) => {
                const findedData = state[type].find(item => item.id === data.id);
                if (findedData) {
                    alert("Already found")
                    return state
                } else if (state.beloved.find(item => item.id === data.id)
                    || state.favorites.find(item => item.id === data.id)) {
                    alert("This item has already been")
                    return state
                } else
                    return { ...state, [type]: [{ ...data }, ...state[type]] }
            }),
            removeItemFromColumn: (type, itemId) => set((state) => ({ ...state, [type]: state[type].filter(item => item.id !== itemId) })),
            // setNewFilterItem: (data: IAddNewFilterItemProps) => (set((state) => {
            //     // if (state.items.find(item => item.id === data.id)) { alert("This item already exists"); return state }
            //     return { ...state, items: state.items.map(item => item.id === data.id ? { ...item, filter: data.filter } : item) }
            // })),
            // removeFilterItems: (cartId: string) => (set(state => ({ ...state, items: state.items.map(item => item.id === cartId ? { ...item, filter: "" } : item) }))),
            clearCart: () => set((state) => ({ ...state, cart: [] })),
            addToCart: (data: ICartItemProps) => set((state) => {
                const findedCartItem: ICartItemProps | undefined = state.cart.find(c => c.id === data.id);
                if (findedCartItem !== undefined) {
                    return { ...state, cart: state.cart.map(c => c.id === findedCartItem.id ? { ...c, count: c.count && c.count + 1 } : c) };
                }
                return {
                    ...state, cart: [...state.cart, { ...data, count: 1 }]
                }
            }),
            incrementCartItemCount: (cartId: string) => set((state) => ({ ...state, cart: state.cart.map(c => c.id === cartId ? { ...c, count: c.count && c.count + 1 } : c) })),
            decrementCartItemCount: (cartId: string) => set((state) => ({ ...state, cart: state.cart.map(c => c.id === cartId ? { ...c, count: c.count && c.count > 1 ? c.count - 1 : c.count } : c) })),
            deleteCartItemById: (cartId: string) => set((state) => ({ ...state, cart: state.cart.filter(c => c.id !== cartId) })),
            setToCart: (data: ICartItemProps[]) => set((state) => ({ ...state, cart: data })),
            inputSearchText: (text: string) => set((state) => ({ ...state, searchText: text })),
            toggleVisibilitySidebar: () => set((state) => ({ ...state, visibleSidebar: !state.visibleSidebar })),
        }),
        {
            name: "state",
            getStorage: () => localStorage,
            partialize: (state) => ({ user: state.user, cart: state.cart, favorites: state.favorites, beloved: state.beloved /*items: state.items*/ }),
        }
    )
)

export const cart: () => ICartItemProps[] = () => useStore((state) => state.cart, shallow)
export const user = () => useStore((state) => state.user.data, shallow)
export const token = () => useStore((state) => state.user.accessToken)
export const setUserData = () => useStore((state) => state.setUser)
export const clearUserData = () => useStore((state) => state.clearUser)
export const beloved: () => ICartItemProps[] = () => useStore((state) => state.beloved, shallow)
export const favorites: () => ICartItemProps[] = () => useStore((state) => state.favorites, shallow)
// export const items: () => ICartItemProps[] = () => useStore((state) => state.items, shallow)
export const totalCartSuma: () => number = () => useStore((state) => state.cart).reduce((prev, next) => next.count ? (prev + next.price * next.count) : 0, 0)
export const searchText: () => string = () => useStore((state) => state.searchText)
export const visibleSidebar: () => boolean = () => useStore((state) => state.visibleSidebar)

export const addToCart = () => useStore((state) => state.addToCart)
export const addItemToColumn = () => useStore((state) => state.addItemToColumn)
export const removeItemFromColumn = () => useStore((state) => state.removeItemFromColumn)
// export const setNewFilterItem = () => useStore((state) => state.setNewFilterItem)
// export const removeFilterItems = () => useStore((state) => state.removeFilterItems)
export const incrementCartItemCount = () => useStore((state) => state.incrementCartItemCount)
export const decrementCartItemCount = () => useStore((state) => state.decrementCartItemCount)
export const setToCart = () => useStore((state) => state.setToCart)
export const clearCart = () => useStore((state) => state.clearCart)
export const deleteCartItemById = () => useStore((state) => state.deleteCartItemById)
export const inputSearchText = () => useStore((state) => state.inputSearchText)
export const toggleVisibilitySidebar = () => useStore((state) => state.toggleVisibilitySidebar)
