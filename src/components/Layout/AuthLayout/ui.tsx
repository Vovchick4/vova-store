import { Outlet } from "react-router-dom"
import { Container } from "../../"
import styles from "./index.module.css"

export default function AuthLayout() {
    return (
        <Container>
            <Outlet />
        </Container>
    )
}