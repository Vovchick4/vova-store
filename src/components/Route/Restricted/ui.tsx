import { FC } from "react"
import { Navigate } from "react-router-dom"
import { useToken } from "../../../hooks"
import urls from "../../../config/urls"

const Restricted: FC<{ children: any }> = ({ children }) => {
    const { accessToken: token } = useToken()
    return !!token ? <Navigate to={urls.chat} /> : children
}

export default Restricted 