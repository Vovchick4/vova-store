import { token, setUserData, clearUserData } from "../zustand/store";
export default function useToken() {
    const accessToken = token()
    const writeUserData = setUserData()
    const removeUserData = clearUserData()
    return { accessToken, writeUserData, removeUserData }
}