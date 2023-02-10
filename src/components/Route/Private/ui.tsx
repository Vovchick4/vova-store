import { FC } from "react"
import { Navigate } from "react-router-dom"
import { useToken } from "../../../hooks"
import urls from "../../../config/urls"

const Private: FC<{ children: any }> = ({ children }) => {
    const { accessToken: token } = useToken()
    return !!token ? children : <Navigate to={urls.login} />
}

export default Private 