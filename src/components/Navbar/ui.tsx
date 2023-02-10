import { Link } from "react-router-dom"
import { AiOutlineLogin } from 'react-icons/ai'
import { RiShoppingCartFill } from 'react-icons/ri'
import RoomChatNavbar from "./RoomChatNavbar";

import { cart, useStore, inputSearchText, toggleVisibilitySidebar } from '../../zustand/store';

import urls from "../../config/urls";

import styles from './index.module.css';

export default function Navbar() {
    const dataCart = cart()
    const textOnChanged = inputSearchText()
    const toggleIsSideBar = toggleVisibilitySidebar()

    return (
        <header className={styles.navbar}>
            <div className={styles.content_input}>
                <input type="text" placeholder="Search" onChange={(e) => textOnChanged(e.target.value.trim())} />
            </div>
            <nav className={styles.content_icons}>
                <Link style={{ color: "white" }} to={urls.login}>
                    <AiOutlineLogin size={25} />
                </Link>
                <div className={styles.content_icons_bordered} onClick={toggleIsSideBar}>
                    <RiShoppingCartFill size={25} />
                    <div>
                        <span>{dataCart.length}</span>
                    </div>
                </div>
            </nav>
        </header>
    )
}

Navbar.RoomChat = RoomChatNavbar