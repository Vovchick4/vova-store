import axios from "axios"

// Set default URL parameters
axios.defaults.baseURL = "http://localhost:5000/" // https://testapi.io/api/VovaVovchick/
axios.defaults.headers.common['Content-Type'] = "application/json"

axios.interceptors.request.use((req) => {
    return req
}, (error) => Promise.reject(error))

axios.interceptors.response.use((res) => {
    return res.data.data
}, (error) => Promise.reject(error.response.data))

export const setAuthToken = (token: string | null) => {
    axios.defaults.headers.Authorization = `Bearer ${token}`
}

export const removeAuthToken = () => {
    axios.defaults.headers.Authorization = null
}