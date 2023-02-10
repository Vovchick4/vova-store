import { user } from "../zustand/store"
export default function useUser() {
    const guest = user()
    return guest
}