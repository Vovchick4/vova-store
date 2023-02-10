import { Outlet } from "react-router-dom"
import { Container, SideBar } from "../.."
import styles from "./index.module.css"

export default function RoomChatLayout() {

    return (
        <Container>
            <div className={styles.main_content}>
                <SideBar.RoomChat />
                <Outlet />
            </div>
        </Container>
    )
}