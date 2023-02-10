import { Outlet } from "react-router-dom"
import { Navbar, SideBar, Container } from "../"
import AuthLayout from "./AuthLayout"
import RoomChatLayout from "./RoomChatLayout"
import styles from "./index.module.css"

export default function Layout() {
    return (
        <Container>
            <Navbar />
            <SideBar />
            <Outlet />
        </Container>
    )
}

Layout.Auth = AuthLayout
Layout.RoomChat = RoomChatLayout
