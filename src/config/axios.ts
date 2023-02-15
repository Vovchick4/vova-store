import axios from "axios"
import { useToken } from "../hooks"

// Set default URL parameters
axios.defaults.baseURL = "http://localhost:5000/" // https://testapi.io/api/VovaVovchick/
axios.defaults.headers.common['Content-Type'] = "application/json"

axios.interceptors.request.use((req) => {
    return req
}, (error) => {
    return Promise.reject(error)
})

axios.interceptors.response.use((res) => {
    if (res.data?.status === 401) {
        useToken().removeUserData()
    }
    return res.data.data
}, (error) => Promise.reject(error.response.data))

export const setAuthToken = (token: string | null) => {
    axios.defaults.headers.Authorization = `Bearer ${token}`
}

export const removeAuthToken = () => {
    axios.defaults.headers.Authorization = null
}