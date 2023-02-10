import axios, { RawAxiosRequestConfig } from "axios"
import useSWRMutation from "swr/mutation"
import { useToken } from "./"
import { setAuthToken } from "../config/axios"
import { IAuthDataResponse } from "./interfaces"
import { IUserProps } from "../zustand/store"

async function getRequest(requestOptions: RawAxiosRequestConfig, accessToken: string | null, removeUserData: () => void): Promise<any> {
    if (!accessToken) {
        return
    }
    setAuthToken(accessToken)
    try {
        return await axios({ ...requestOptions })
    } catch (e) {
        removeUserData()
        alert((e as Error).message)
    }
}

async function sendRequest(requestOptions: RawAxiosRequestConfig, { arg }: any, writeData: (data: IUserProps) => void): Promise<any> {
    try {
        const data: IUserProps = await axios({ ...requestOptions, data: JSON.stringify(arg), headers: { 'Content-Type': 'application/json' } })
        if (data) {
            writeData(data)
        }
    } catch (e) {
        alert((e as Error).message)
    }
}

export default function useAuth(requestOptions: RawAxiosRequestConfig) {
    const { accessToken, writeUserData, removeUserData } = useToken()
    // const onSuccess = (data: IAuthDataResponse) => {
    //     console.log(data);
    //     if (data?.token) {
    //         writeToken(data.token)
    //     }
    // }
    return useSWRMutation(requestOptions, (...args) => requestOptions.url !== "/auth/get-user" ? sendRequest(...args, writeUserData) : getRequest(requestOptions, accessToken, removeUserData), {})
}