import axios from "axios"
import useSWRMutation from "swr/mutation"
import { setUserData } from "../zustand/store"
import { IAuthDataResponse } from "./interfaces"

export async function sendRequest(url: string, { arg }: any): Promise<IAuthDataResponse> {
    return axios({ url, method: 'POST', data: JSON.stringify(arg) })
}

export default function useRegister() {
    const writeToken = setUserData()
    const onSuccess = (data: IAuthDataResponse) => {
        if (data?.token) {
            writeToken(data.token)
        }
    }
    return useSWRMutation("/auth/register", sendRequest, { onSuccess })
}