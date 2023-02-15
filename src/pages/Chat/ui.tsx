import useSwr from "swr"
import { useParams } from 'react-router-dom'
import { Navbar, Footer } from '../../components'

import { useChat } from "./models"
import { useUser } from "../../hooks"
import { IUserDataProps } from "../../hooks/interfaces"

import styles from './index.module.css'

export default function ChatPage() {
    const { chatId } = useParams()
    const currentUser = useUser()
    const { messeges, secondUserSocketID } = useChat(chatId, currentUser)

    const { data, isLoading } = useSwr<IUserDataProps | undefined>(chatId !== undefined ? { url: `/auth/get-user/${chatId}` } : null)

    return (
        <div className={styles.content_chat}>
            <Navbar.RoomChat findedUser={data} isLoading={isLoading} />
            <div id="content_wrapper" className={styles.content_wrapper}>
                <ul className={styles.chat_content}>
                    {messeges && currentUser && messeges.map(({ id, from, send_user_id, nickName, message }) => (
                        <li className={currentUser.id === send_user_id ? `${styles.list_roomchat_content + " " + styles.active}` : styles.list_roomchat_content} key={id}>
                            <div className={styles.message_content}>
                                <h3>{currentUser.id !== send_user_id ? nickName : null}</h3>
                                <h4>{message}</h4>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer.RoomChat user={data} userNickname={currentUser ? currentUser.nickName : ""} socketId={secondUserSocketID} />
        </div>
    )
}


