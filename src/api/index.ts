import http from "../http"
import { ICartItemProps } from "../zustand/store"

export const getItems: () => Promise<ICartItemProps[]> = () => http.get("get-items", null, null)