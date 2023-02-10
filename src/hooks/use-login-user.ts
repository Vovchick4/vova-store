import useSWRMutation from "swr/mutation"
import { setUserData } from "../zustand/store"
import { IAuthDataResponse } from "./interfaces"
import { sendRequest } from "./use-register-user"

export default function useLogin() {
    const writeToken = setUserData()
    const onSuccess = (data: IAuthDataResponse) => {
        if (data?.token) {
            writeToken(data.token)
        }
    }
    return useSWRMutation("/auth/login", sendRequest, { onSuccess })
}